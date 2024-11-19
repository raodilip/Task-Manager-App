import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, setTasks, handleEditTask }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${task._id}`);
      setTasks(prevTasks => prevTasks.filter(t => t._id !== task._id));
    } catch (error) {
      console.error('There was an error deleting the task!', error);
    }
  };

  const toggleCompleted = async () => {
    try {
      await axios.put(`http://localhost:5001/api/tasks/${task._id}`, { completed: !task.completed });
      setTasks(prevTasks => prevTasks.map(t => t._id === task._id ? { ...t, completed: !task.completed } : t));
    } catch (error) {
      console.error('There was an error updating the task!', error);
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
    <div className="card-body">
      <h5 className="card-title">{task.title}</h5>
      <p className="card-text">
        {task.description}
      </p>
      <p className="card-text">
        <small className="text-muted">Deadline: {new Date(task.deadline).toLocaleString()}</small>
      </p>
      <p className={`badge ${task.completed ? 'bg-success' : 'bg-warning text-dark'}`}>
        {task.completed ? 'Completed' : 'Pending'}
      </p>
      <div className="mt-3">

        <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditTask(task)}>
            Edit
        </button>
        <button className="btn btn-primary btn-sm me-2" onClick={() => toggleCompleted(task)}>
          Toggle Completed
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  </div>
  );
};

export default TaskItem;
