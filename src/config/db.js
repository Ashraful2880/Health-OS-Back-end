const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri =
  process.env.MONGODB_URI ||
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eb0xvvp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

function connectDB() {
  return mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

module.exports = { connectDB };
