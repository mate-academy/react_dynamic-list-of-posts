import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getUsers } from '../../api/users';

export const UserSelect = ({ selectedUserId, selectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async() => {
    const loadedUser = await getUsers();

    setUsers(loadedUser.slice(0, 10));
  };

  return (
    <label>
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        value={selectedUserId}
        onChange={selectUser}
      >
        <option value="0">All users</option>
        {users.map((user, index) => (
          <option
            key={user.id}
            value={index + 1}
          >
            {user.name}
          </option>
        ))}
      </select>
    </label>
  );
};

UserSelect.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
