# Health-OS Backend API

![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)
![Express](https://img.shields.io/badge/Express.js-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

A professional Node.js/Express REST API for the Health-OS platform. This backend powers the Health-OS web application, providing endpoints for products, orders, users, customers, and blogs.

🔗 **Frontend Repository**: [Health-OS-Front-End](https://github.com/[your-username]/Health-OS-Front-End)  
🌐 **Live Demo**: [https://health-os.netlify.app/](https://health-os.netlify.app/)

## Features

- 🏗️ Modular folder structure (controllers, routes, config, middlewares)
- 🗄️ MongoDB Atlas integration
- 🔐 JWT authentication for users
- 🚨 Centralized error handling
- 📦 RESTful API for:
  - Products
  - Orders
  - Customers
  - Users
  - Blogs
- ⚙️ Environment variable support

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/Health-OS-Back-End.git
   cd Health-OS-Back-End
Install dependencies:

bash
npm install
Configure environment variables:

bash
cp .env.example .env
Fill in your MongoDB credentials and other configuration in the .env file.

Running the Server
Development:

bash
npm run dev
Production:

bash
npm start
The server will run on the port specified in your .env (default: 5000).

API Endpoints
Products
Method	Endpoint	Description
GET	/products	Get all products
GET	/products/:id	Get product by ID
POST	/products	Create a new product
PUT	/products/:id	Update a product
DELETE	/products/:id	Delete a product
Orders
Method	Endpoint	Description
GET	/orders	Get all orders
POST	/orders	Create a new order
PUT	/orders/:id	Update order status
Customers
Method	Endpoint	Description
GET	/customers	Get all customers
GET	/customers/:id	Get customer by ID
POST	/customers	Create a new customer
DELETE	/customers/:id	Delete a customer
Users
Method	Endpoint	Description
POST	/users/signup	Register a new user
POST	/users/login	Login
GET	/users	Get all users (admin)
POST	/users	Create a user (admin)
Blogs
Method	Endpoint	Description
GET	/blogs	Get all blogs
Error Handling
All errors are returned in JSON format with an error message:

json
{
  "success": false,
  "message": "Error message"
}
Unknown routes return a 404 error

Validation errors return 400 status

Authentication errors return 401 status

Project Structure
text
health-os-backend/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middlewares/      # Custom middlewares
├── models/           # MongoDB models
├── routes/           # Route definitions
├── utils/            # Utility classes/functions
├── .env.example      # Environment variables example
├── app.js            # Express application
└── server.js         # Server entry point
License
This project is licensed under the ISC License.
