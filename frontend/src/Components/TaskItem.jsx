import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, setTasks, handleEditTask }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`http://localhost:5001/api/tasks/${task._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
        body: JSON.stringify(task),
      })  
      //await axios.delete(`http://localhost:5001/api/tasks/${task._id}`);
      if(response.ok){
          setTasks(prevTasks => prevTasks.filter(t => t._id !== task._id));
      }
      else{
        console.error('Failed to delete task:', response.statusText);
      }
    } catch (error) {
      console.error('There was an error deleting the task!', error);
    }
  };

  const toggleCompleted = async () => {
    try {
        const payload = { completed: !task.completed }
        const token = localStorage.getItem('token'); 
        const response = await fetch(`http://localhost:5001/api/tasks/${task._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(payload),
          })
        if(response.ok){
            setTasks(prevTasks => prevTasks.map(t => t._id === task._id ? { ...t, completed: !task.completed } : t));
        }
        else{
            console.error('Failed to toggle completion', response.statusText);
        }  
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
