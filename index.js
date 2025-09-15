// index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const UserRoutes = require('./routes/user_routes');

const app = express();
const port = process.env.PORT || 3000;

// middleware to parse JSON body
app.use(express.json());

// // simple sample route
// const object = [
//   { name: "Abdul Basit", age: "25" },
//   { name: "Munim Sarfarz", age: "23" },
//   { name: "Hamza", age: "22" },
//   { name: "Jawad Ahmad", age: "27" }
// ];

// app.get('/aboutmyself', (req, res) => {
//   res.json({ msg: 'Welcome to backend development', data: object });
// });

// API routes
app.use('/api/v0/users', UserRoutes);

// connect DB first, then start server
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server because DB connection failed.', err);
    process.exit(1);
  }
};

start();
