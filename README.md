# 🚀 QuickHire – Full Stack Job Portal Application

QuickHire is a modern full-stack Job Portal platform built with the MERN stack.  
It allows users to browse jobs, submit applications, and admins to manage jobs and applications securely with role-based access control.

---

## 🌐 Live Links

- 🔗 Frontend: https://job-hunting-client.vercel.app
- 🔗 Backend API: https://job-hunting-server-chi.vercel.app
---

# 🛠️ Tech Stack

## 🔹 Backend (Server)

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Role-Based Authorization (RBAC)

## 🔹 Frontend (Client)

- React
- React Router DOM
- Tailwind CSS
- Ant Design (Antd)
- React Icons
- Axios

---

# ✨ Features

## 👤 User / Candidate

- Register & Login (JWT Authentication)
- Browse all jobs
- Search jobs by keyword & location
- View job details
- Submit job application
- Fully responsive design

## 🛠 Admin

- Secure admin login
- Create new job
- Delete job
- View all users (Admin only route)
- View all submitted job applications
- Protected routes with middleware

---

# 🔐 Authentication System

- JWT-based authentication
- Password hashing before saving
- Role-based middleware
- Protected API routes

---

# 🌐 API Base URL

```
http://localhost:5000/api/v1
```

---

# 🔄 API Endpoints

## 🔐 Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Register new user |
| POST | /api/v1/auth/login | Login user |

---

## 👥 User Routes

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | /api/v1/users | Admin Only |

---

## 💼 Job Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/jobs | Get all jobs |
| GET | /api/v1/jobs/:id | Get job by ID |
| POST | /api/v1/jobs | Create job (Admin only) |
| PUT | /api/v1/jobs/:id | Update job (Admin only) |
| DELETE | /api/v1/jobs/:id | Delete job (Admin only) |

---

# 📄 Application Routes (`/api/v1/applications`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/v1/applications | Candidate | Submit job application |
| GET | /api/v1/applications | Admin Only | Get all submitted applications |
| GET | /api/v1/applications/:id | Admin Only | Get single application by ID |

---

# 📦 Environment Variables

Create a `.env` file in the server root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# 🧪 Run Locally

## 1️⃣ Clone Repository

```
git clone https://github.com/Alamin9462/job_hunting_client.git
cd job_hunting_client
```

---

## 2️⃣ Setup Backend

```
git clone https://github.com/Alamin9462/job_hunting_server.git
job_hunting_server.git
```

```
cd server
npm install
npm run dev
```

Server runs at:
```
http://localhost:5000
```

---

## 3️⃣ Setup Frontend

```
cd client
npm install
npm run dev
```

Client runs at:
```
http://localhost:5173
```

---

# 📂 Project Structure

```
quickhire/

├── client/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   └── assets/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── config/
│   ├── app.ts
│   └── server.ts
│
└── README.md
```

---

# 🚀 Deployment

- Frontend → Vercel
- Backend → Vercel / Render
- Database → MongoDB Atlas

---

# 📱 Responsive Design

- Mobile Friendly
- Desktop Ready
- Modern Hero Section
- Responsive Search Box

---

# 🔮 Future Improvements
-  Resume upload feature
- Application status tracking
- Email notifications
- Pagination & filtering
- Dark mode
- Advanced dashboard analytics

---

# 👨‍💻 Author

**Md Alamin**  
CSE Student | Full Stack Developer  

GitHub: https://github.com/Alamin9462 
LinkedIn: https://www.linkedin.com/in/alamin9462/

---

