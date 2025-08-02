
require('dotenv').config();
const app = require('./src/app');
const { connectDB } = require('./src/config/db');

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log('Running Server Port is', port);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  });
