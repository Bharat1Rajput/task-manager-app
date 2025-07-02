# 🗂️ Task Manager App (Backend)

A feature-rich backend application built with **Node.js**, **Express**, and **MongoDB** that allows users and admins to manage tasks efficiently. Includes authentication, RBAC, file uploads, email reminders, filtering, and optional real-time notifications.

---

## 🚀 Features

- ✅ **User Authentication** using **JWT**
- 🔐 **Role-Based Access Control (RBAC)** for Admin and User
- 📝 **CRUD Operations** on Tasks
- 🔍 **Search, Filter, Sort & Pagination**
- 📤 **File Uploads** using Multer
- 📬 **Email Notifications** with **Nodemailer + NodeCron**
- 📡 *(Optional)* **Real-Time Notifications** using **Socket.io**
- ☁️ **Deployment** using **Render**
- 💾 **MongoDB Atlas** for cloud database

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT, Bcrypt
- **File Uploads**: Multer
- **Email Reminders**: Nodemailer + NodeCron
- **Realtime (Optional)**: Socket.io
- **Deployment**: Render

---

## 📁 Folder Structure

task-manager-app/

├── controllers/

├── middlewares/

├── models/

├── routes/

├── uploads/

├── .env

├── server.js

└── README.md


---

## ⚙️ Installation

1. Clone the repo  
   ```bash
   git clone https://github.com/Bharat!Rajput/task-manager-app.git
   cd task-manager-app
   ```
   
2. Install dependencies
   npm install
   
3.Create a .env file
PORT=5000
MONGO_URI=your_mongo_atlas_url
JWT_SECRET=your_jwt_secret

4.Run the app
npm start

---
##🔐 API Routes

| Method | Route            | Access | Description                     |
| ------ | ---------------- | ------ | ------------------------------- |
| POST   | /api/auth/signup | Public | Register new user               |
| POST   | /api/auth/login  | Public | Login user & return token       |
| POST   | /api/tasks       | User   | Create task                     |
| GET    | /api/tasks       | User   | Get user's tasks (with filters) |
| PATCH  | /api/tasks/\:id  | User   | Update user's task              |
| DELETE | /api/tasks/\:id  | User   | Delete user's task              |
| POST   | /api/admin       | Admin  | Admin assigns task to user      |
| DELETE | /api/admin/tasks | Admin  | Admin deletes all tasks         |

Use Bearer Token in headers for protected routes.

---
## 🧪 API Testing with Postman
Import collection

Add Bearer Token in Authorization tab

Upload files via form-data (key: attachment)

Test scheduled email reminder by setting due date soon

---
## 🧠 Future Improvements

Frontend UI with React.js

Task commenting & activity log

Real-time collaboration with Socket.io

Admin analytics dashboard
