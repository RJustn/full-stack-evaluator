import { useState } from 'react';
import api from "./api/axios"

function Users({ users, reloadUsers, reloadTasks }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');;

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
            reloadUsers();

        } catch (err) {
            console.error('Error creating user:', err);
            alert('Failed to create user');
        }
    }

    //For Deleting Users
    const handleDeleteUser = async (userId) => {
        try {
            await api.delete(`/users/${userId}`);
            reloadUsers();
            reloadTasks();

        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Failed to delete user');
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleAddUser}>
                <input
                    style={{ marginLeft: "10px" }}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    style={{ marginLeft: "10px" }}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button style={{ marginLeft: "10px" }} type="submit">Create User</button>
            </form>

            <h2>Users</h2>
            <table border="1" cellPadding="8" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%', marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Tasks</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td><strong>{user.email}</strong></td>
                                <td>
                                    {(user.tasks ?? []).length > 0 ? (
                                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                            {user.tasks.map((task) => (
                                                <li key={task.id}>
                                                    {task.title} {task.isDone ? '✅' : '❌'}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <em>No tasks</em>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


        </div>
    );
}

export default Users;
