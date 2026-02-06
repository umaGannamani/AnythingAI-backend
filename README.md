Backend Developer Intern Assignment – Anything AI
Project Overview

This project is a backend API for a simple Task Management system, featuring:

- User registration & login with password hashing and JWT authentication

- Role-Based Access Control (RBAC) (admin vs user)

- CRUD operations for tasks (users can manage their own tasks, admins can manage all tasks)

- Input validation using Joi

- Database: SQLite (for simplicity, ephemeral storage on deployment)

- API documentation via Swagger

- Basic frontend support via React for testing APIs

*** Project Structure ***

backend/
│
├── src/
│   ├── config/
│   │   └── db.js                # SQLite connection & schema
│   │
│   ├── controllers/
│   │   ├── authController.js    # Register/Login APIs
│   │   └── taskController.js    # Task CRUD APIs with RBAC
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification
│   │   └── roleMiddleware.js    # RBAC role checking
│   │
│   ├── routes/
│   │   ├── authRoutes.js        # /auth routes
│   │   └── taskRoutes.js        # /tasks routes (protected)
│   │
│   ├── utils/
│   │   └── validator.js         # Joi validation schemas
│   │
│   ├── app.js                   # Express app setup
│   └── server.js                # Server entry point
│
├── swagger.js                   # Swagger configuration
├── package.json
├── .env
└── README.md

*** Features ***
1. Authentication

- Register: POST /api/v1/auth/register

- Login: POST /api/v1/auth/login

- Passwords are hashed using bcrypt

- JWT tokens issued on login (valid for 1 hour)

2. Role-Based Access Control (RBAC)

- User role: Can CRUD only own tasks

- Admin role: Can CRUD all tasks

3. Tasks CRUD

- Create Task: POST /api/v1/tasks

- Get Tasks: GET /api/v1/tasks

- Update Task: PUT /api/v1/tasks/:id

- Delete Task: DELETE /api/v1/tasks/:id

4. Input Validation

- Joi used to validate registration inputs and task creation/update

- Returns 400 if validation fails

5. API Documentation

- Swagger available at /api-docs (after running locally or deployed)

6. Security

- JWT authentication required for all task routes

- Role-based authorization ensures users cannot modify others’ tasks

- Input validation prevents invalid or unsafe data

*** Technologies Used ***

- Node.js & Express.js

- SQLite (lightweight relational DB)

- bcryptjs for password hashing

- jsonwebtoken (JWT) for authentication

- Joi for input validation

- Swagger for API documentation

- Helmet & CORS for basic security

- React.js frontend (for demonstration)

*** Setup Instructions ***

1. Clone the repository
   
git clone <your-repo-url>

cd backend

2. Install dependencies
   
npm install

3. Configure environment variables

Create a .env file:

PORT=5000

JWT_SECRET=your_secret_key

4. Run locally
   
npm start


or with nodemon:

npx nodemon src/server.js

5. Access API

Base URL: http://localhost:5000/api/v1

Swagger Docs: http://localhost:5000/api-docs

*** Deployment Notes (Render) ***

- Backend deployed at: https://anythingai-backend-a8jw.onrender.com/


*** Testing ***

- Use Postman or the React frontend to test registration, login, and task CRUD operations.

- Admins can create, edit, and delete all tasks.

- Users can only access their own tasks.
