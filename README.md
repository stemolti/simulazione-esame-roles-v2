# Practical Exam Simulation – S2  
**Registration and Check-in Management for Corporate Training Events**

---

## 📋 Project Description

This application is a simulation of the practical exam for the ITS course, developed with the **MEAN stack** (MongoDB, Express, Angular 19, Node.js).  
It manages employee registrations and check-ins for internal company training events, differentiating between **employee** and **organizer** roles.

The goal is to build a full-stack web application featuring authentication, relational data management, and frontend-backend interaction through REST APIs.

---

## 🎯 Exam Objectives

- Design and develop a functional full-stack web application  
- Implement secure authentication (JWT)  
- Correctly handle use cases for event registration and check-in  
- Proper implementation and consumption of REST APIs  
- Clear, responsive, and usable user interface  
- Well-organized code following best practices  
- (Optional) Deployment on a public server for additional evaluation  

---

## ⚙️ Technical Requirements

- Clear separation between backend and frontend  
- Frontend using Client-Side Rendering (Angular 19)  
- Backend built with Node.js, Express, and MongoDB  
- APIs documented and testable (Postman, Swagger, or similar)  
- Application initialized with realistic data sets to test all use cases  
- Structured and documented code  

---

## 🏗 Application Architecture

### Backend
- Node.js + Express  
- MongoDB for data storage  
- REST API exposing all operations (CRUD events, registrations, check-ins, authentication)  
- JWT-based authentication and role-based authorization  

### Frontend
- Angular 19 SPA  
- Responsive and accessible design  
- Separate dashboards for employees and organizers  
- Menu-based navigation  

---

## 📌 Main Use Cases

### Employee
- Register and log in  
- View list of available events  
- Register or cancel registration for events (up to the day before the event)  
- View personal registrations  

### Organizer
- Log in  
- Create, edit, and delete events  
- Manage event participant check-ins  
- View statistics of past events, including check-in counts and participation percentages, with date filtering  

---

## 🔐 Security Rules

- Only organizers can create, edit, delete events and manage check-ins  
- Employees can view only their own registrations  
- Event registration and cancellation allowed only until the day before the event  

---

## 📄 Main API Endpoints

| Method | Endpoint                  | Description                      | Authentication Required          |
|--------|---------------------------|--------------------------------|---------------------------------|
| POST   | /api/users/register        | Register a new user             | No                              |
| POST   | /api/users/login           | User login (returns JWT token) | No                              |
| GET    | /api/events                | Get list of events              | Yes                             |
| POST   | /api/events                | Create event                   | Yes (organizer only)             |
| PUT    | /api/events/:id            | Update event                   | Yes (organizer only)             |
| DELETE | /api/events/:id            | Delete event                   | Yes (organizer only)             |
| POST   | /api/registrations         | Register for event             | Yes (employee)                   |
| DELETE | /api/registrations/:id     | Cancel event registration      | Yes (employee)                   |
| POST   | /api/checkin               | Register participant check-in  | Yes (organizer only)             |

---

## 🗃 Data Model

### User
- _id (PK)  
- FirstName  
- LastName  
- Email  
- Password (hashed)  
- Role (Employee / Organizer)  

### Event
- _id (PK)  
- Title  
- Date  
- Description  

### Registration
- _id (PK)  
- UserID (FK)  
- EventID (FK)  
- CheckInDone (boolean)  
- CheckInTime  

---

## 🖥 Setup & Installation

### Backend
```bash
cd backend
npm install
npm run dev
