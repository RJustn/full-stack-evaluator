import './App.css'
import { useState, useEffect } from "react"
import api from "./api/axios";
import Tasks from "./Tasks"
import Users from "./Users"

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  // Load tasks from backend
  const loadTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Load users from backend
  const loadUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Load both on mount
  useEffect(() => {
    loadTasks();
    loadUsers();
  }, []);

  return (
    <div className="app">
      <h1>📝 React Task Evaluator</h1>
      <Tasks tasks={tasks} reloadTasks={loadTasks} users={users} reloadUsers={loadUsers} />
      <Users users={users} reloadUsers={loadUsers} />
    </div>
  );
}

export default App
