import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEditTask = (task) => {
    setTaskToEdit(task); // Set the task to edit
    navigate(`/edit-task/${task._id}`); // 
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Handle case where token is not available
        alert('You are not authenticated!');
        return;
      }
  
      const response = await fetch('http://localhost:5001/api/tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // Include token in the header
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Set tasks to state or process them
        setTasks(data);
      } else {
        console.error('Error fetching tasks:', data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="container mt-4">
    <h2>Task List</h2>
    {tasks.length > 0 ? (
      tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          setTasks={setTasks}
          handleEditTask={handleEditTask}
        />
      ))
    ) : (
      <p className="text-muted">No tasks available. Add some tasks to get started!</p>
    )}
  </div>
  );
};

export default TaskList;
