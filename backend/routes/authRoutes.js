// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

// User Registration
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = new User({ username, email, password });
      await user.save();

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
  }
);

// User Login
router.post('/login',
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }
    req.user = user;
    next();
  });
};

// Protect Task Routes with Authentication and Authorization
router.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Protected Task Routes (Example)
router.get('/tasks', authenticateJWT, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }); // Only return tasks of the authenticated user
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Admin Route (only accessible by users with the 'admin' role)
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied, admin role required' });
  }
  next();
};

router.get('/admin', authenticateJWT, authorizeAdmin, (req, res) => {
  res.json({ message: 'Welcome, admin' });
});

module.exports = {router, authenticateJWT};
