import { useEffect, useState } from 'react';
import api from "./api/axios"

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
