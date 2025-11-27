--------------Task Management System-----------------

-------Created by: Prakhar Tripathi----------

------------A full-stack Task Management System built using Spring Boot, PostgreSQL, JWT Authentication, React.js, and Tailwind CSS.
Designed for real-world use with clean UI, role-based secure access, AI-based task suggestions, analytics dashboard, and complete CRUD flow.--------------

Features
  Authentication & Security
	•	User signup & login
	•	JWT Access & Refresh tokens
	•	Secure logout
	•	Token refresh mechanism
	•	Password hashing with BCrypt
	•	Protected backend routes


 Task Management
	•	Create, update, and delete tasks
	•	Task Priority (Low, Medium, High)
	•	Task Status (To Do, In Progress, Completed)
	•	AI-generated task suggestions
	•	View full task details
	•	Filter tasks by status & priority
	•	Search tasks
	•	Split view: Active Tasks & Completed Tasks
	•	Task timestamps (created & updated)

 Dashboard & Analytics
	•	Total tasks count
	•	Completed tasks count
	•	Completion percentage calculation
	•	Pie chart showing tasks by status
	•	Beautiful, clean UI
	•	Back to home navigation

 Frontend (React + Tailwind + Vite)
	•	Modern responsive UI
	•	Clean typography
	•	Real-time search filtering
	•	Dark blue gradient background
	•	Persistent navbar (non-scrollable)
	•	Beautiful task cards
	•	Toast messages for success/error
	•	Easy navigation between pages

  --------Backend (Spring Boot + PostgreSQL)---------
	•	Modular package structure
	•	Task API (/api/tasks)
	•	Auth API (/api/auth)
	•	DTO-based request/response system
	•	Entity mapping with JPA
	•	Proper service-layer separation
	•	Global exception handling
	•	Clean repository interfaces

--------Tech Stack-----------
Frontend
	•	React.js
	•	Vite
	•	Tailwind CSS
	•	Axios
	•	Recharts (Dashboard charts)

Backend
	•	Spring Boot
	•	Spring Security
	•	JWT
	•	Hibernate (JPA)
	•	PostgreSQL
	•	Lombok

---------Folder Structure------------
task-management-system/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   ├── application.properties
│   └── ...Spring Boot code...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── ...React code...
│
└── README.md

<------------Setup Instructions---------------->

  Backend Setup (Spring Boot)
	1.	Install Java 17+
	2.	Install PostgreSQL
	3.	Create database: CREATE DATABASE taskmanager;
  4.	Update application.properties (DB username/password)
	5.	Run backend: mvn spring-boot:run

  Backend runs at:
  http://localhost:8080

  Frontend Setup (React + Vite)
	1.	Install Node.js (v18+)
	2.	Navigate to frontend folder: cd task-frontend
  3.	Install dependencies: npm install
  4.	Start app: npm run dev

  Frontend runs at:
  http://localhost:5173

  <-------------Environment Variables---------------->

  Backend (application.properties):
  spring.datasource.url=jdbc:postgresql://localhost:5432/taskmanager
  spring.datasource.username=postgres
  spring.datasource.password=your_password

  jwt.secret=YOUR_VERY_LONG_SECRET_KEY
  jwt.access-expiration-ms=3600000
  jwt.refresh-expiration-ms=86400000

  Frontend (axios.js)
  baseURL: "http://localhost:8080/api"

  ------------API Endpoints Overview-------------
-----Auth API-----
POST
/api/auth/signup
Register new user
POST
/api/auth/login
Login user
POST
/api/auth/logout
Logout user
POST
/api/auth/refresh
Refresh access token

-----Tasks API------
GET
/api/tasks
Get all tasks
GET
/api/tasks/{id}
Get task details
POST
/api/tasks
Create task
PUT
/api/tasks/{id}
Update task
DELETE
/api/tasks/{id}
Delete task

-------------Planned Features (Upcoming)----------------
	•	Admin Dashboard (view all users + their tasks)
	•	Role-based access (Admin, Manager, User)
	•	Comments inside tasks
	•	Team workspace + invitations
	•	Recently deleted tasks (Trash Bin)
	•	Real-time updates via WebSockets
	•	Drag-and-drop Kanban Board
	•	User profile page

---------Author-----------
Prakhar Tripathi
GitHub: https://github.com/hellerfelix
---------------------------------------------------
If you found this project useful

Please consider starring the repository on GitHub!

  
  
  
