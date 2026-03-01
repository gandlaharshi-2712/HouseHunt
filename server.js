import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/househunt")
  .then(() => console.log("MongoDB Connected"));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["owner", "renter"] }
});

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  bedrooms: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const User = mongoose.model("User", userSchema);
const Property = mongoose.model("Property", propertySchema);

const protect = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, "harshitha_secret");
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });
  res.json(user);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id, role: user.role }, "harshitha_secret");
  res.json({ token });
});

app.post("/add-property", protect, async (req, res) => {
  if (req.user.role !== "owner")
    return res.status(403).json({ message: "Only owners allowed" });

  const property = await Property.create({
    ...req.body,
    owner: req.user.id
  });

  res.json(property);
});

app.get("/properties", async (req, res) => {
  const properties = await Property.find().populate("owner", "name");
  res.json(properties);
});

app.listen(5000, () => console.log("Server running on port 5000"));
