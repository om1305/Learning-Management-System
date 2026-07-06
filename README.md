# 🎓 AI-Powered Learning Management System (LMS)

A full-stack **Learning Management System (LMS)** built with **React (Vite)**, **Node.js**, **Express.js**, **MongoDB**, and an **Advanced RAG (Retrieval-Augmented Generation) Search Pipeline** powered by **ChromaDB**.

Unlike a traditional LMS, this project integrates an intelligent semantic search engine using **Hybrid Search**, **Reciprocal Rank Fusion (RRF)**, and **Re-ranking**, enabling users to discover the most relevant courses instead of relying on simple keyword matching.

---

# 🚀 Live Features

## 👤 Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* HTTP-Only Cookie-based Session
* Cookie Parser Integration
* Password Encryption
* Role-Based Authorization

  * User
  * Admin

After successful registration/login:

* JWT Token is generated.
* Token is stored securely inside an **HTTP-only cookie**.
* Every protected request is authenticated using the stored cookie.

---

# 📚 Course Management

Users can:

* Browse available courses
* View course details
* Purchase premium courses
* Access enrolled courses

Admins can:

* Create new courses
* Upload course thumbnails
* Create course modules
* Upload module videos
* Manage all available courses

---

# 🤖 AI-Powered Course Search (Advanced RAG)

One of the major highlights of this project is the **Advanced Retrieval-Augmented Generation (RAG) Search Pipeline**.

Instead of relying on traditional database filtering, the LMS performs semantic retrieval using **ChromaDB**.

### Search Pipeline

```
User Query
      │
      ▼
Embedding Generation
      │
      ▼
ChromaDB Vector Search
      │
      ▼
Keyword Search
      │
      ▼
Hybrid Search
      │
      ▼
Reciprocal Rank Fusion (RRF)
      │
      ▼
Re-ranking
      │
      ▼
Top 3 Most Relevant Courses
```

### Technologies Used

* ChromaDB
* Vector Embeddings
* Hybrid Search
* Reciprocal Rank Fusion (RRF)
* Re-ranking
* Semantic Retrieval

This pipeline significantly improves search relevance compared to traditional keyword-based search by combining lexical and semantic retrieval techniques.

---

# 💳 Stripe Payment Integration

Users can securely purchase courses using **Stripe Checkout**.

### Stripe Test Card

```
Card Number:
4242 4242 4242 4242

Expiry:
Any Future Date

CVV:
Any 3 Digits

ZIP:
Any 5 Digits
```

After successful payment:

* Stripe Checkout Session is created
* Payment is verified
* Course is added to the user's account
* Stripe Session ID is stored in MongoDB

---

# 📊 Admin Dashboard

The admin panel provides complete LMS analytics.

### Dashboard Statistics

* Total Revenue
* Total Courses
* Total Enrollments
* Registered Users
* Purchased Courses

Admins can efficiently monitor the overall performance of the platform.

---

# 🗄 Database

MongoDB is used to store:

* Users
* Courses
* Course Modules
* Enrollments
* Stripe Session IDs
* Purchase History

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* JavaScript
* React Router
* Axios
* Bootstrap
* React Bootstrap

---

## Backend

* Node.js
* Express.js
* JavaScript
* JWT Authentication
* Cookie Parser
* Multer
* Cloudinary
* Stripe API

---

## Database

* MongoDB
* Mongoose

---

## AI / Search Pipeline

* ChromaDB
* Vector Embeddings
* Hybrid Search
* Reciprocal Rank Fusion (RRF)
* Re-ranking

---

# 🔐 Authentication Flow

```
Register/Login
        │
        ▼
Generate JWT
        │
        ▼
Store Token in HTTP-only Cookie
        │
        ▼
Protected Routes
        │
        ▼
Role Verification
        │
        ▼
Admin / User Access
```

---

# 📂 Project Structure

```text
Learning-Management-System/

├── Backend/
│   ├── src/
│   │   ├── Config/          # Database, Cloudinary, Stripe configuration
│   │   ├── Controller/      # Business logic
│   │   ├── Middlewares/     # Authentication & Authorization
│   │   ├── Models/          # MongoDB Schemas
│   │   ├── Routes/          # REST APIs
│   │   ├── Services/        # Advanced RAG Pipeline
│   │   │   ├── ChromaDB
│   │   │   ├── Hybrid Search
│   │   │   ├── Reciprocal Rank Fusion (RRF)
│   │   │   └── Re-ranking
│   │   └── Utils/           # Helper functions
│   │
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── API/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── Hooks/
│   │   ├── Pages/
│   │   ├── Routes/
│   │   ├── Store/
│   │   └── lib/
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/om1305/Learning-Management-System.git
cd Learning-Management-System
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

# 🌟 Key Highlights

* Full Stack MERN Application
* JWT Authentication
* Cookie-Based Authorization
* Role-Based Access Control
* Stripe Payment Gateway
* Admin Analytics Dashboard
* Course & Module Management
* AI-Powered Course Search
* Advanced RAG Pipeline
* ChromaDB Integration
* Hybrid Search
* Reciprocal Rank Fusion (RRF)
* Re-ranking for Better Retrieval
* MongoDB Database
* Responsive UI
* Production-Ready Architecture

---

# 📌 Future Improvements

* AI Course Recommendation System
* Instructor Dashboard
* Course Reviews & Ratings
* Certificates
* Quiz & Assessments
* Video Progress Tracking
* Email Notifications
* Real-time Chat
* Docker Deployment
* Kubernetes Support

---

# 👨‍💻 Author

**Om Agarwal**

GitHub: https://github.com/om1305

---

# ⭐ If you found this project helpful, consider giving it a Star!
