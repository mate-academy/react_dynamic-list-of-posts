import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api/users';


export const UserSelect = ({ changeHandler, selectedUser }) => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async() => {
    const usersFromServer = await getUsers();

    setUsers(usersFromServer.slice(0, 9));
  };

  return (
    <header className="App__header">
      <label>
        Select a user: &nbsp;
        <select
          value={selectedUser}
          onChange={changeHandler}
          className="App__user-selector"
        >
          <option value="0">All users</option>
          {users.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </label>
    </header>
  )
}