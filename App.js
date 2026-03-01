import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [page, setPage] = useState("login");
  const [form, setForm] = useState({});
  const [properties, setProperties] = useState([]);

  const register = async () => {
    await axios.post("http://localhost:5000/register", form);
    alert("Registered Successfully");
    setPage("login");
  };

  const login = async () => {
    const res = await axios.post("http://localhost:5000/login", form);
    localStorage.setItem("token", res.data.token);
    setPage("dashboard");
  };

  const addProperty = async () => {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/add-property", form, {
      headers: { Authorization: token }
    });
    alert("Property Added");
  };

  const loadProperties = async () => {
    const res = await axios.get("http://localhost:5000/properties");
    setProperties(res.data);
  };

  useEffect(() => {
    if (page === "dashboard") loadProperties();
  }, [page]);

  if (page === "login")
    return (
      <div>
        <h2>Login</h2>
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })} />
        <button onClick={login}>Login</button>
        <p onClick={() => setPage("register")}>Register</p>
      </div>
    );

  if (page === "register")
    return (
      <div>
        <h2>Register</h2>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })} />
        <select onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="renter">Renter</option>
          <option value="owner">Owner</option>
        </select>
        <button onClick={register}>Register</button>
      </div>
    );

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => setPage("add")}>Add Property</button>
      {properties.map(p => (
        <div key={p._id}>
          <h4>{p.title}</h4>
          <p>{p.location}</p>
          <p>₹{p.price}</p>
          <p>Owner: {p.owner?.name}</p>
        </div>
      ))}
      {page === "add" && (
        <div>
          <h3>Add Property</h3>
          <input placeholder="Title"
            onChange={e => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Location"
            onChange={e => setForm({ ...form, location: e.target.value })} />
          <input placeholder="Price"
            onChange={e => setForm({ ...form, price: e.target.value })} />
          <input placeholder="Bedrooms"
            onChange={e => setForm({ ...form, bedrooms: e.target.value })} />
          <button onClick={addProperty}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default App;
