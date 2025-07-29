
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Import and use routes
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/orders', orderRoutes);

const customerRoutes = require('./routes/customerRoutes');
app.use('/customers', customerRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const blogRoutes = require('./routes/blogRoutes');
app.use('/blogs', blogRoutes);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Centralized error handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Running Health OS Server");
});

module.exports = app;
