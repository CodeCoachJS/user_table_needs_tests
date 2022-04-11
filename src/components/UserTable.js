import React, { useEffect, useState } from 'react';

const UserTable = () => {
    const [newUser, setNewUser] = useState({ firstName: '', userName: '' });
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await window.fetch(
                'https://jsonplaceholder.typicode.com/users'
            );
            const json = await res.json();
            setUsers(json);
        } catch (e) {
            setError(e?.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (prop) => {
        // this function leverages closure scope
        // `prop` is kept in closure scope so we can create functions
        // that can update different parts of the user object
        return (e) => {
            setNewUser((prev) => ({
                ...prev,
                [prop]: e.target.value,
            }));
        };
    };

    const submitUser = async () => {
        try {
            setError(null);
            const res = await window.fetch(
                'https://jsonplaceholder.typicode.com/users',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        name: newUser.firstName,
                        username: newUser.userName,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            );
            const json = await res.json();

            setUsers((prev) => [...prev, json]);
            setNewUser({ firstName: '', userName: '' });
        } catch (e) {
            setError(e?.message);
        }
    };

    return (
        <>
            <h1>User Table</h1>
            <div data-testid="userForm">
                <input
                    placeholder="First Name"
                    value={newUser.firstName}
                    onChange={handleChange('firstName')}
                />
                <input
                    placeholder="User Name"
                    value={newUser.userName}
                    onChange={handleChange('userName')}
                />
                <button
                    onClick={submitUser}
                    disabled={
                        !newUser.firstName.length || !newUser.userName.length
                    }
                >
                    +
                </button>
            </div>
            <hr />
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <td>First Name</td>
                            </th>
                            <th>
                                <td>User Name</td>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {error && (
                    <p data-testid="errorMessage">
                        Oops, looks like an error occurred
                    </p>
                )}
            </div>
        </>
    );
};

export default UserTable;
