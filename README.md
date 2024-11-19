# Task Management Application

A full-stack Task Management application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). The application supports features like task creation, editing, marking tasks as completed, deleting tasks, and user authentication with JWT.

---

## **Screenshots**

### **Task List**
![Task List Screenshot](/taskList.png)

### **Task Creation/Edition**
![Task Creation Screenshot](/edit.png)

### **Login Page**
![Login Page Screenshot](/login.png)


## **Features**
- User authentication (Register/Login) using **JWT**.
- CRUD operations for tasks:
  - Create tasks with title, description, and deadline.
  - Edit tasks.
  - Toggle task completion.
  - Delete tasks.
- Protected routes for authenticated users.
- Frontend styled with **Bootstrap**.
- RESTful API with validation and error handling.

---

## **Technologies Used**
### Frontend:
- **React.js** (with React Router for navigation)
- **Bootstrap** for styling

### Backend:
- **Node.js** with **Express.js**
- **MongoDB** as the database
- **Mongoose** for MongoDB object modeling
- **JWT** for user authentication and authorization

---

## **Prerequisites**
- Node.js installed on your system
- MongoDB server running locally or a cloud instance (e.g., MongoDB Atlas)

---

## **Installation and Setup**

### 1. Clone the Repository

```bash
git clone https://github.com/raodilip/Task-Manager-App.git
cd task-manager-app
```

### 2. Install Dependencies
#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd ../frontend
npm install
```

### 3. Set Up Environment Variables
#### Backend:
Create a `.env` file in the `backend` directory and configure the following:
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5001
```

#### Frontend:
No additional configuration needed unless connecting to a custom backend URL.

### 4. Run the Application
#### Backend:
Start the backend server:
```bash
cd backend
npm start
```

#### Frontend:
Start the React application:
```bash
cd frontend
npm start
```

### 5. Access the Application
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5001](http://localhost:5001)

---

## **API Endpoints**

### **Authentication**
| Method | Endpoint       | Description           |
|--------|----------------|-----------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and get JWT   |

### **Tasks**
| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| GET    | `/api/tasks`          | Fetch all tasks            |
| POST   | `/api/tasks`          | Create a new task          |
| GET    | `/api/tasks/:id`      | Fetch a task by ID         |
| PUT    | `/api/tasks/:id`      | Update a task by ID        |
| DELETE | `/api/tasks/:id`      | Delete a task by ID        |
