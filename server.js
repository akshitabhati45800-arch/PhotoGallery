 const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
app.use(cors());
app.use(express.json());

//server starts
 app.listen(process.env.PORT || 3000, (req, res) => {
  console.log('Server is running on port ' + (process.env.PORT || 3000));
});


// Routes
const adminRoute = require("./routes/adminRoutes");
const teacherRoute = require("./routes/teacherRoutes");
const studentRoute = require("./routes/studentRoutes");
const authRoutes = require("./routes/authenticationRoutes");

// Route Middleware
app.use(adminRoute);
app.use(teacherRoute);
app.use(studentRoute);
app.use(authRoutes);

// database connection

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });