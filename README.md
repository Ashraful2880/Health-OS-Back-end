Health-OS-Back-End
A professional Node.js/Express REST API for the Health-OS platform. This backend powers the Health-OS web application, providing endpoints for products, orders, users, customers, and blogs.

Frontend Repo: Health-OS-Front-End
Live Site: https://health-os.netlify.app/
Features
Modular folder structure (controllers, routes, config, middlewares)
MongoDB Atlas integration
JWT authentication for users
Centralized error handling
RESTful API for products, orders, customers, users, and blogs
Environment variable support
Getting Started
Prerequisites
Node.js (v14+ recommended)
MongoDB Atlas account (or local MongoDB)
Installation
Clone the repository:
Install dependencies:
Configure environment variables:
Copy .env.example to .env and fill in your MongoDB credentials and collection names.
Running the Server
Development:
Production:
The server will run on the port specified in your .env (default: 5000).

API Endpoints
Products
GET    /products — Get all products
GET    /products/:id — Get product by ID
POST   /products — Create a new product
PUT    /products/:id — Update a product
DELETE /products/:id — Delete a product
Orders
GET    /orders — Get all orders
POST   /orders — Create a new order
PUT    /orders/:id — Update order status
Customers
GET    /customers — Get all customers
GET    /customers/:id — Get customer by ID
POST   /customers — Create a new customer
DELETE /customers/:id — Delete a customer
Users
POST   /users/signup — Register a new user
POST   /users/login — Login
GET    /users — Get all users
POST   /users — Create a user (admin)
Blogs
GET    /blogs — Get all blogs
Error Handling
All errors are returned in JSON format with an error message.
Unknown routes return a 404 error.
Project Structure
License
This project is licensed under the ISC License.
