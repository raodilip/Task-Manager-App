const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true, enum: ['Work', 'Personal'] },
  deadline: { type: Date },
  completed: { type: Boolean, default: false },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
