import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../../api/users';
import './UserSelect.scss';

export const UserSelect = ({ selectedUserId, handleUserSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function inner() {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer.slice(0, 10));
    }

    inner();
  }, []);

  return (
    <label>
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        value={selectedUserId}
        onChange={handleUserSelect}
      >
        <option value="0">All users</option>
        {users.map((user, index) => (
          <option value={index + 1} key={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </label>
  );
};

UserSelect.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  handleUserSelect: PropTypes.func.isRequired,
};
