import React, { useState , useEffect} from 'react';
import TaskForm from '../Components/TaskForm';
import { useParams, useNavigate } from 'react-router-dom';

const TaskPage = () => {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      fetchTaskById(id); // Fetch the task details if editing
    }
  }, [id]);

  const fetchTaskById = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/tasks/${taskId}`);
      const data = await response.json();
      setTaskToEdit(data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };
  const handleFormSubmit = async (task) => {
    try {
      const response = task._id
        ? await fetch(`http://localhost:5001/api/tasks/${task._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
          })
        : await fetch('http://localhost:5001/api/tasks/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
          });

      const data = await response.json();
      console.log('Task saved:', data);
      setTaskToEdit(null); // Reset the editing state
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task); // Pass the task to edit into the form
  };

  return (
    <div>
      <h1>{taskToEdit ? 'Edit Task' : 'Create Task'}</h1>
      <TaskForm onSubmit={handleFormSubmit} taskToEdit={taskToEdit} onEdit={handleEditTask}/>
    </div>
  );
};

export default TaskPage;
