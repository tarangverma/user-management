# User Management Web Application

This is a web application for managing users, built with Vue.js for the frontend, Node.js with Express.js for the backend, and PostgreSQL for the database.

## Features
    1. User Authentication (Sign Up and Login)
    2. User Management Dashboard
         - View a list of users
         - Edit user details
         - Delete users (with toast notifications)
         - Invite new users
    3. Responsive design for mobile, tablet, and desktop
    4. Secure password hashing

## Prerequisites

## Before starting, make sure you have the following installed:

    Node.js (v16 or later)
    npm (comes with Node.js) or yarn
    PostgreSQL (latest version recommended)
    Git (optional, for cloning the repository)

## Installation and Setup
1. Clone the Repository
  ```
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
  ```
2. Set Up the Backend

    Navigate to the backend directory:
  ```
    cd backend
  ```
  ## Install dependencies:
  ```
    npm install
  ```
  ## Set up environment variables:

  ## Create a .env file in the backend directory and add the following:
  ```
    JWT_SECRET=your_secret  
    DB_USER=your_DB_user
    DB_PASSWORD=your_DB_password
    DB_NAME=your_DB_name
    DB_HOST=localhost
    DB_PORT=5432
  ```
  ## Replace username, password, and database_name with your PostgreSQL credentials.


  Start the backend server:
  ```
    nodemon app.js or node app.js
  ```
  The backend server will start on http://localhost:5000.
  
3. Set Up the Frontend

    Navigate to the frontend directory:
  ```
    cd ../frontend
  ```
  Install dependencies:
  ```
    npm install
  ```
  Start the frontend development server:
  ```
    npm run dev
  ```

  The frontend server will start on http://localhost:5173.
  ## Usage

    Open your browser and go to http://localhost:5173.
    Use the Sign Up page to create a new account.
    Log in with your credentials.
    Navigate to the Dashboard to manage users:
        View the list of users.
        Edit or delete user details.
        Invite new users.

  ## Project Structure

```
project-root/
│
├── backend/                # Backend API
│   ├── controllers/        # API controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── migrations/         # Database migrations
│   ├── .env                # Environment variables
│   ├── server.js           # Main server file
│
├── frontend/               # Frontend app
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── views/          # Vue views (pages)
│   │   ├── router/         # Vue Router setup
│   │   ├── App.vue         # Root component
│   │   ├── main.js         # Entry point
│   └── public/             # Static files
│
└── README.md               # Project documentation
```

Scripts
Backend Scripts
  ```
    npm run dev - Start the backend in development mode.
    npm start - Start the backend in production mode.
  ```
Frontend Scripts
  ```
    npm run dev - Start the frontend in development mode.
    npm run build - Build the frontend for production.
  ```
Troubleshooting

    If the backend fails to connect to the database:
        Ensure PostgreSQL is running.
        Verify the credentials in the .env file.
## Database
  Use PG Admin to view tables(optional)
  use same credientials to create a server and database as in .env file

## API use case

Here are some example API use cases for the user management application. These use cases demonstrate how the backend APIs can be used to perform actions like signing up, logging in, managing users, and more.
API Use Cases
1. User Signup
```
Endpoint: POST /api/users/signup
Description: Create a new user account.
```
Request Body (JSON):
```
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```
2. User Login

Endpoint: POST /api/users/login
Description: Authenticate a user and return a JWT token.

Request Body (JSON):

{
  "email": "john.doe@example.com",
  "password": "password123"
}

Response (Success):

{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response (Error):

{
  "error": "Invalid email or password"
}

3. Get All Users

Endpoint: GET /api/users
Description: Fetch a list of all users (admin only).

Headers:
```
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```
Response (Success):
```
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "Admin",
    "createdAt": "2024-11-22T10:00:00Z"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "role": "User",
    "createdAt": "2024-11-20T10:00:00Z"
  }
]
```
4. Update User Details

Endpoint: PUT /api/users/:id
Description: Update the details of a specific user.

Headers:
```
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```
Request Body (JSON):
```
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "role": "Moderator"
}
```
Response (Success):
```
{
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "role": "Moderator"
  }
}
```

5. Delete a User
```
Endpoint: DELETE /api/users/:id
Description: Delete a user by ID (admin only).
```
Headers:
```
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```
6. Invite New User
```
Endpoint: POST /api/users/invite
Description: Add a new user to the system (admin only).
```
Headers:
```
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```
Request Body (JSON):
```
{
  "name": "Invited User",
  "email": "invited.user@example.com",
  "role": "User"
}
```
