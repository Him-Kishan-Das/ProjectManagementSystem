# 🗂️ Project Management System

![Project Management Screenshot](https://via.placeholder.com/800x400?text=Project+Management+Dashboard) 
*Example dashboard interface - replace with actual screenshot*

A full-stack web application for managing teams, tasks, and projects with multiple user roles. Built with modern web technologies including React for the frontend and Node.js/Express for the backend, with MongoDB for data storage.

## 🌟 Key Features

### 👥 Role-Based Access Control
- **Admin Portal**: Full system control with user management capabilities
- **Manager Workspace**: Project oversight with task delegation tools
- **Member Dashboard**: Task tracking and collaboration interface

### 🛠️ Core Functionality
- JWT-based authentication system
- Real-time task updates and notifications
- Interactive project timelines and Gantt charts
- Team collaboration with comment threads
- Comprehensive reporting and analytics


## 🚀 Installation Guide

### Prerequisites
- Node.js v16+
- MongoDB Atlas account or local MongoDB instance
- Git version control

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ProjectManagementSystem.git
   cd ProjectManagementSystem

2. **Configure environment variables**

    Create .env files in both client and server directories:
    
    server/.env
      ```bash
      PORT=5000
      MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/project-management
      JWT_SECRET=your_secure_jwt_secret_here
      JWT_EXPIRE=30d
      NODE_ENV=development

  `
   client/.env

      REACT_APP_API_URL=http://localhost:5000/api/v1
      REACT_APP_ENV=development

3. **Install dependencies**
   ```bash
       # Frontend dependencies
        cd client
        npm install
        
        # Backend dependencies
        cd ../server
        npm install

4. **Run the appllication**
     ```bash
       
     # In separate terminals:
     
    # Start backend server
    cd server
    npm run dev
    
    # Start frontend development server
    cd ../client
    npm start

## 🧰 Technology Stack

  ### Frontend
  
  ### **Technology**
    - React 18
    - React Router
    - Axios
    - Material UI

          
  2. ### Backend
  ### **Technology**
    - Node.js
    -  Express
    -  MongoDB
    -  CORS
    -  JWT
    -  Nodemon
          
        

