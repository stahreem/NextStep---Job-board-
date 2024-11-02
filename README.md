# 🌐 NextStep--Job Board Application

#   Backend
This is a backend API for a job board application, powered by the **MERN stack** (MongoDB, Express, React, Node.js). It provides user authentication, job postings, company profiles, and job applications, along with permissions for different user roles (recruiters and applicants).

## ✨ Table of Contents
- [🚀 Technologies Used](#-technologies-used)
- [📂 Project Structure](#-project-structure)
- [🔗 API Endpoints](#-api-endpoints)
  - [🔐 Authentication](#-authentication)
  - [👥 User Management](#-user-management)
  - [🏢 Company Management](#-company-management)
  - [💼 Job Management](#-job-management)
  - [📄 Application Management](#-application-management)
- [⚠️ Error Handling](#%EF%B8%8F-error-handling)
- [🔮 Future Improvements](#-future-improvements)

## 🚀 Technologies Used
- **Node.js** and **Express** for server and routing
- **MongoDB** with **Mongoose** as the database and ORM
- **JWT** for authentication and authorization
- **Cloudinary** for file uploads (e.g., profile pictures)
- **bcryptjs** for password hashing

## 📂 Project Structure
```plaintext
├── controllers       # API endpoint logic
├── middleware        # Middleware for auth and role checks
├── models            # Mongoose schemas
├── routes            # API routes
├── utils             # Helper functions
└── server.js         # Application entry point
```

## 🔗 API Endpoints

### 🔐 Authentication
1. **Register User**
   - **POST** `/api/auth/register`
   - Body: `{ fullName, email, password, role }`
   - 📌 Registers a new user as either an applicant or recruiter.

2. **Login User**
   - **POST** `/api/auth/login`
   - Body: `{ email, password }`
   - 🛡️ Returns a JWT token for user authorization.

### 👥 User Management
1. **Update Profile**
   - **PUT** `/api/user/update`
   - Body: `{ fullName, email, phoneNumber, bio, skills }`
   - ✏️ Updates the profile of the authenticated user.

2. **Get Profile**
   - **GET** `/api/user/:id`
   - 👤 Retrieves user profile by ID.

### 🏢 Company Management
1. **Register Company**
   - **POST** `/api/company/register`
   - Body: `{ companyName }`
   - 📝 Registers a company for a recruiter (recruiter role required).

2. **Update Company**
   - **PUT** `/api/company/:id`
   - Body: `{ name, description, website, location }`
   - 🛠️ Updates the details of a company; accessible by recruiters only.

3. **Get Company by ID**
   - **GET** `/api/company/:id`
   - 🔍 Retrieves company information by ID.

### 💼 Job Management
1. **Post Job**
   - **POST** `/api/jobs`
   - Body: `{ title, description, requirements, salary, experienceLevel, location, jobType, position, companyID }`
   - 📢 Creates a new job posting for a company (recruiter role required).

2. **Get All Jobs**
   - **GET** `/api/jobs`
   - Query: `keyword`
   - 🗂️ Retrieves a list of all job postings, with optional search by keyword.

3. **Get Job by ID**
   - **GET** `/api/jobs/:id`
   - 🔍 Retrieves a specific job posting by ID.

4. **Get Admin Jobs**
   - **GET** `/api/jobs/admin`
   - 🎯 Retrieves jobs posted by the logged-in recruiter.

### 📄 Application Management
1. **Apply for Job**
   - **POST** `/api/applications/:id`
   - Body: `{ jobId }`
   - 📩 Allows an applicant to apply for a specific job (applicant role required).

2. **Get Applied Jobs**
   - **GET** `/api/applications`
   - 📝 Retrieves jobs the logged-in applicant has applied to.

3. **Get Applications for a Job**
   - **GET** `/api/applications/job/:id`
   - 🕵️‍♂️ Retrieves applications for a specific job; accessible by recruiters.

4. **Update Application Status**
   - **PATCH** `/api/applications/:id/status`
   - Body: `{ status }`
   - 🔄 Updates the status of a job application (e.g., "accepted", "rejected"); recruiters only.

### ⚠️ Error Handling
All errors are logged to the console, and a structured JSON error response is sent to the client:
- **500** for internal server errors
- **400** or **404** for client-side errors (e.g., missing fields, unauthorized access)

## 🔮 Future Improvements
- **Add Pagination and Filtering** for job listings.
- **Advanced Role-Based Permissions** to refine access controls.
- **Add Email Notifications** for job application status updates.
- **Implement Unit and Integration Testing** for stability.

---
