const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { authenticateJWT } = require('../routes/authRoutes');

// Create a new task
router.post('/',authenticateJWT, async (req, res) => {
  const { title, description, category, deadline } = req.body;

  const newTask = new Task({
    title,
    description,
    category,
    deadline,
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create task' });
  }
});

// Get all tasks
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Update a task
router.put('/:id', authenticateJWT, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

// Route to fetch a specific task by ID
router.get('/:id',authenticateJWT, async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await Task.findById(id); // Find the task by its ID
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task); // Return the task
    } catch (error) {
      console.error('Error fetching task:', error);
      res.status(500).json({ error: 'Failed to fetch the task' });
    }
  });
module.exports = router;
