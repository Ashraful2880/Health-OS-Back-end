const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();


// Database connection is handled in src/config/db.js

const app = express();
// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', require('./routes'));

const routes = require("./routes");
app.use("/", routes);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Centralized error handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Running Health OS Server");
});

module.exports = app;
