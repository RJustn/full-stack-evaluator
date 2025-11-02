import { useEffect, useState } from 'react';
import api from "./api/axios"

function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() =>{
    loadusers();
  }, []);

  const loadusers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  //For Adding Users
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      const response = await api.post('/users', {
        email: email,
        passwordHash: password
      });

      alert(`User created with ID: ${response.data.id}`);
      setEmail('');
      setPassword('');
      loadusers();

    } catch (err) {
      console.error('Error creating user:', err);
      alert('Failed to create user');
    }
}

  //For Deleting Users
  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      loadusers();

    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  return (
    <div>
      <h2>Users</h2>

            <h2>Create User</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Create User</button>
      </form>

      
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.email}
             <button
              style={{ marginLeft: '10px' }}
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
