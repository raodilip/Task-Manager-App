import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './Components/TaskList';
import TaskPage from './pages/TaskPage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Navbar from './Components/Navbar';
import PrivateRoute from './Components/PrivateRoute';

function App() {

  useEffect(() => {
    const clearTokenOnClose = () => {
      localStorage.removeItem('token'); // Clear token
    };

    window.addEventListener('beforeunload', clearTokenOnClose);

    return () => {
      window.removeEventListener('beforeunload', clearTokenOnClose);
    };
  }, []);

  return (
    <Router>
    <Navbar />
    <div className="container mt-4">
    <Routes>
      <Route path="/create-task" element={<PrivateRoute><TaskPage /> </PrivateRoute>} />
      <Route path="/" element={<PrivateRoute><TaskList /> </PrivateRoute>} />
      <Route path="/edit-task/:id" element={<PrivateRoute><TaskPage /> </PrivateRoute>} />
      <Route path="/login" element={<LoginPage /> } />
      <Route path="/register" element={<RegisterPage /> } />
    </Routes>
    </div>
  </Router>
  );
}

export default App;
