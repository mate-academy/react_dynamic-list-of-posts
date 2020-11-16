import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../../api/users';

export const UserSelect = ({ changeHandler, selectedUser }) => {
  const [users, setUsers] = useState([]);

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
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </label>
    </header>
  );
};

UserSelect.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  selectedUser: PropTypes.number.isRequired,
};
