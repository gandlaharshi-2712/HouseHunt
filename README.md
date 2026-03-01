# HouseHunt
MERN stack house rental application
# 🏠 HouseHunt – Rental Property Management System

## 📌 Project Overview

HouseHunt is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application developed to simplify the rental property management process.

The system enables:
- 👤 Users to register and login securely
- 🏠 Owners to add rental properties
- 🔍 Renters to view available properties
- 🔐 Secure authentication using JWT
- 🔒 Password encryption using bcrypt

This project demonstrates full-stack development with role-based access control and secure API communication.

---

## 🚀 Features

- User Registration & Login
- Role-based access (Owner / Renter)
- Add Property (Owner only)
- View Properties
- Secure Authentication (JWT)
- MongoDB Database Integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- HTML5 & CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt Password Hashing

---

## 📂 Project Structure

```
househunt/
│
├── server.js
├── client/
│   └── App.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/househunt.git
cd househunt
```

---

### 2️⃣ Install Backend Dependencies

```bash
npm install
```

---

### 3️⃣ Start Backend Server

```bash
node server.js
```

Server runs on:
```
http://localhost:5000
```

---

### 4️⃣ Setup Frontend

Go to client folder:

```bash
cd client
npm install
npm start
```

Frontend runs on:
```
http://localhost:3000
```

---

## 🔐 Authentication Flow

1. User registers with role (Owner / Renter)
2. Password is encrypted using bcrypt
3. On login, JWT token is generated
4. Protected routes verify JWT before access

---

## 🗄️ Database Schema

### User Schema

- name
- email (unique)
- password (hashed)
- role (owner / renter)

### Property Schema

- title
- location
- price
- bedrooms
- owner (reference to User)

---

## 📊 System Architecture

Frontend (React)  
⬇  
Backend (Express API)  
⬇  
MongoDB Database  

The application follows a client-server architecture with RESTful API communication.

---

## 🧪 Testing

- Manual testing for registration & login
- Verified role-based access control
- Tested property creation & retrieval
- Validated JWT authentication

---

## 🔮 Future Enhancements

- Payment Gateway Integration
- Booking System
- Property Image Upload
- Admin Dashboard
- Deployment on Cloud (AWS / Render)

---

## 👩‍💻 Developed By

**Gandla Harshitha**

---

## 📄 License

This project is developed for academic purposes.
