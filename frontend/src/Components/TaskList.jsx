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
    axios.get('http://localhost:5001/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error('There was an error fetching tasks!', error));
  }, []);

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
