const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Task routes
const taskRouter = require('./routes/taskRoutes');
app.use('/api/tasks', taskRouter);
const { router: authRoutes } = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); // Authentication routes


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
