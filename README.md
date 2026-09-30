# CivicHelp AI

A Smart Citizen Complaint and Service Management Platform built using the MERN stack.

## 📌 Overview

CivicHelp AI allows citizens to report civic issues such as road damage, water leakage, electricity problems, garbage, and street-light issues.

The platform provides a complete complaint lifecycle:

**Citizen → Complaint → AI Classification → Admin Assignment → Staff Action → Status Updates → Resolution**

## 🚀 Features

### Citizen
- User registration and login
- Create civic complaints
- Add complaint title, description, category, location, and priority
- AI-assisted complaint classification
- View submitted complaints
- Track complaint status
- View complaint status history
- Receive notifications
- Mark notifications as read
- CivicHelp AI assistant for common complaint-related questions

### Admin
- Admin authentication
- View all complaints
- Search complaints by title
- Filter complaints by status
- Assign complaints to staff
- View complaint statistics
- Complaint status chart
- Generate complaint summaries

### Staff
- View assigned complaints
- View citizen and complaint details
- Update complaint status
- View status history
- Automatically notify citizens when complaint status changes

## 🤖 AI-Assisted Features

The project currently uses a lightweight rule-based approach for AI-assisted functionality.

### Complaint Classification
The system analyzes complaint title and description to determine:

- Category
- Priority

Supported categories:

- Road
- Water
- Electricity
- Garbage
- Street Light
- Other

Priority levels:

- Low
- Medium
- High

### Complaint Summarization
The system generates a short complaint summary from the complaint title and description.

### Citizen Assistant
The assistant provides predefined responses for common questions related to:

- Reporting complaints
- Tracking complaints
- Complaint categories
- Complaint priorities
- Road issues
- Water issues
- Garbage issues
- Electricity issues

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Recharts
- Vite

### Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcryptjs
- CORS

### Database
- MongoDB
- Mongoose

### Development Tools
- Git
- GitHub
- VS Code

## 🔐 Authentication & Security

- JWT-based authentication
- Password hashing using bcrypt
- Role-based authorization
- Protected API routes
- Admin-only routes
- Staff-specific complaint access
- Environment variables for sensitive configuration

## 👥 User Roles

| Role | Responsibilities |
|------|------------------|
| Citizen | Create and track complaints |
| Staff | Handle assigned complaints and update status |
| Admin | Manage complaints and assign staff |

## 🔄 Complaint Workflow

```text
Submitted
    ↓
Assigned
    ↓
In Progress
    ↓
Resolved