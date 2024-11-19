import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, taskToEdit , onEdit}) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    deadline: '',
    category: '',
    completed: false,
  });

  useEffect(() => {
    if (taskToEdit) {
        setTask({
            title: taskToEdit.title || '',
            description: taskToEdit.description || '',
            deadline: taskToEdit.deadline
              ? new Date(taskToEdit.deadline).toISOString().slice(0, 16)
              : '',
              category: taskToEdit.category || '' ,
              completed: taskToEdit.completed || '',
          });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ title: '', description: '', deadline: '', category: '', completed: false });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      {/* <h2 className="mb-4">{taskToEdit ? 'Edit Task' : 'Create Task'}</h2> */}

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          className="form-control"
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="deadline" className="form-label">Deadline</label>
        <input
          type="datetime-local"
          id="deadline"
          name="deadline"
          value={task.deadline}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={task.category}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={task.completed}
          onChange={handleChange}
          className="form-check-input"
        />
        <label htmlFor="completed" className="form-check-label">Completed</label>
      </div>

      <button type="submit" className="btn btn-primary">
        {taskToEdit ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
