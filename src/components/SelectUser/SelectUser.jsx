import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../../api/users';

export const SelectUser = React.memo(({ currentUserId, handleUserSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = useCallback(async() => {
    const usersFromApi = await getUsers();

    setUsers(usersFromApi.slice(0, 10));
  }, []);

  return (
    <label>
      Select a user: &nbsp;

      <select
        value={currentUserId}
        onChange={handleUserSelect}
        className="App__user-selector"
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
});

SelectUser.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  handleUserSelect: PropTypes.func.isRequired,
};
