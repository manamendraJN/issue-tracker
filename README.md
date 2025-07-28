Issue Tracker Application

    https://issuesync.netlify.app/

This is a full-stack web application for tracking issues, built as part of a guided assignment. It includes user authentication, issue creation, viewing, editing, and deletion, with a modern UI enhanced by toast notifications and a reusable navigation bar.
Table of Contents

Features

User Authentication: Register and log in with email and password.
Issue Management: Create, view, edit, and delete issues with customizable severity, priority, and status.
Navigation Bar: A global navbar showing user info and logout functionality.
Toast Notifications: Real-time feedback for actions (success, error, loading) using react-toastify.
Responsive Design: Built with Tailwind CSS for a mobile-friendly interface.

Technologies

Frontend: React, Vite, Tailwind CSS, react-toastify
Backend: Node.js, Express, MongoDB (via Mongoose), JWT for authentication
Deployment: Render (backend), Netlify (frontend)

Setup
Prerequisites

Node.js (v16 or later)
npm (comes with Node.js)
MongoDB Atlas account (for database)
Git (for version control)

Installation

    Clone the repository:
    git clone https://github.com/manamendraJN/issue-tracker
    cd issue-tracker


Set up the backend:

Navigate to the backend folder:

    cd backend
    
Install dependencies:

    npm install

Create a .env file with the following variables:

    MONGO_URI=your-mongodb-atlas-connection-string
    JWT_SECRET=your-secure-secret-key
    PORT=5000
    
Start the backend:

    npm run dev

Set up the frontend:

Navigate to the frontend folder:

    cd frontend

Install dependencies:

    npm install

Start the frontend:

    npm run dev

Run the application:

Open http://localhost:5173 in your browser.
Register a new user, log in, and start managing issues.

Usage

Register: Visit /register to create an account.
Login: Use /login to access the app.
Issue List: View all issues at /issuelist.
Create Issue: Go to /createissue to add a new issue.
Issue Detail: Click an issue to view/edit/delete at /issuedetail/:id.
Logout: Use the navbar logout button to sign out.
