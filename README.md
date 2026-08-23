# Smart Job Placement and Recruitment Management System

A full-stack web application designed to simplify the job placement and recruitment process for candidates and administrators.

The system provides separate candidate and admin workflows for profile management, job browsing, applications, application tracking, placement management, and recruitment administration.

## 🚀 Live Project

### Frontend

🔗 https://smart-job-placement-system-recruitm.vercel.app/

The React frontend is deployed on Vercel and can be accessed independently.

### Backend

🔗 `http://localhost:8080`

The backend is built with Spring Boot and currently runs locally.

> **Note:** The backend is not publicly deployed. Therefore, features that require the Spring Boot REST API will work only when the backend is running locally.

### GitHub Repository

🔗 https://github.com/Lanashree07/Smart_Job_Placement_System_Recruitment

---

## 📌 Project Overview

The Smart Job Placement and Recruitment Management System connects candidates and administrators through a centralized recruitment platform.

### Candidate Features

* Candidate registration and login
* Candidate profile management
* Browse available jobs
* View detailed job information
* Apply for jobs
* Track application status
* View placement information
* Update profile information

### Admin Features

* Admin login
* Admin dashboard
* View candidate statistics
* View available jobs
* Create jobs
* Update jobs
* Delete jobs
* View all applications
* Update application status
* View placements
* Update placement status
* Monitor recruitment statistics

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* React Router
* Axios

### Backend

* Java
* Spring Boot
* Spring Data JPA
* REST API
* Hibernate
* Maven

### Database

* H2 Database

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Vercel

---

## 🏗️ Project Architecture

```text
Smart Job Placement and Recruitment Management System
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── candidate/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
└── spring-server/
    ├── src/
    │   └── main/
    │       └── java/
    │           └── com/
    │               └── smartjob/
    │                   ├── controller/
    │                   ├── service/
    │                   ├── repository/
    │                   ├── entity/
    │                   └── dto/
    └── pom.xml
```

---

## 🔗 REST API Endpoints

### Authentication

```text
POST /api/auth/login
POST /api/auth/register
POST /api/auth/admin/register
```

### Candidates

```text
GET    /api/candidates
GET    /api/candidates/{id}
PUT    /api/candidates/{id}
```

### Jobs

```text
GET    /api/jobs
GET    /api/jobs/{id}
POST   /api/jobs
PUT    /api/jobs/{id}
DELETE /api/jobs/{id}
```

### Applications

```text
GET  /api/applications
GET  /api/applications/{id}
GET  /api/applications/candidate/{candidateId}
POST /api/applications
PUT  /api/applications/{id}/status
```

### Placements

```text
GET /api/placements
GET /api/placements/{id}
GET /api/placements/candidate/{candidateId}
PUT /api/placements/{id}/status
```

### Admin Dashboard

```text
GET /api/admin/dashboard
```

### Health Check

```text
GET /api/health
```

---

## 📊 Admin Dashboard

The admin dashboard retrieves real-time statistics from the Spring Boot REST API.

Example dashboard response:

```json
{
  "totalCandidates": 2,
  "totalJobs": 3,
  "totalApplications": 3,
  "underReview": 0,
  "shortlisted": 0,
  "selected": 2,
  "rejected": 0,
  "totalPlacements": 2
}
```

The dashboard displays:

* Total Candidates
* Total Jobs
* Total Applications
* Total Placements
* Application Status Pipeline
* Recent Jobs
* Recent Applications

---

## ▶️ Running the Project Locally

### 1. Start the Spring Boot Backend

Open PowerShell:

```powershell
cd "C:\Users\lanan\OneDrive\Desktop\Smart_Job_Placement_System_Recruitment\spring-server"
```

Run:

```powershell
..\apache-maven-3.9.6\bin\mvn.cmd spring-boot:run
```

Backend will run on:

```text
http://localhost:8080
```

Test the health endpoint:

```text
http://localhost:8080/api/health
```

---

### 2. Start the React Frontend

Open another terminal:

```powershell
cd "C:\Users\lanan\OneDrive\Desktop\Smart_Job_Placement_System_Recruitment\frontend"
```

Install dependencies if required:

```powershell
npm install
```

Start the frontend:

```powershell
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

## 🔌 Frontend–Backend Integration

The React frontend communicates with the Spring Boot REST API through Axios.

```javascript
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000
});
```

The frontend uses REST API services for:

* Authentication
* Candidate management
* Job management
* Applications
* Placements
* Admin dashboard statistics

---

## 🔐 User Roles

The system supports two roles:

```text
CANDIDATE
ADMIN
```

### Candidate

Candidates can register, log in, manage their profile, browse jobs, apply for jobs, and track applications and placements.

### Admin

Administrators can manage jobs, candidates, applications, and placements through the admin dashboard.

---

## 📈 Application Status

Applications can have the following statuses:

```text
APPLIED
UNDER_REVIEW
SHORTLISTED
INTERVIEW
SELECTED
REJECTED
```

Placement statuses include:

```text
SELECTED
OFFER_RECEIVED
JOINED
PLACEMENT_COMPLETED
```

---

## 🎯 Project Objectives

* Provide a centralized recruitment platform
* Simplify candidate job applications
* Allow administrators to manage recruitment activities
* Track application progress
* Manage placement information
* Demonstrate React frontend and Spring Boot REST API integration
* Provide a structured full-stack software development project

---

## 🔮 Future Enhancements

* JWT-based authentication
* Password encryption
* Email notifications
* Resume upload and storage
* Advanced job search and filtering
* Recruiter/company accounts
* Interview scheduling
* Cloud database
* Public Spring Boot backend deployment
* Production environment configuration

---

## 👩‍💻 Developer

**Lana Shree Ganesan**

B.E. Computer Science Engineering

Focused on Software Development, Web Development and Full-Stack Development.

---

## 📄 License

This project is developed for educational and portfolio purposes.
