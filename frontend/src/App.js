import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './Components/TaskList';
import TaskPage from './pages/TaskPage';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/create-task" element={<TaskPage />} />
      <Route path="/" element={<TaskList />} />
      <Route path="/edit-task/:id" element={<TaskPage />} />
    </Routes>
  </Router>
  );
}

export default App;
