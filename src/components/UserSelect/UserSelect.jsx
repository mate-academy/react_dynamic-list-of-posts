import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../../api/posts';

export const UserSelect = ({ userId, setUserId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    }

    fetchUsers();
  }, []);

  return (
    <label>
      Select a user: &nbsp;
      <select
        className="App__user-selector"
        value={userId}
        onChange={(event) => {
          setUserId(+event.target.value);
        }}
      >
        <option value="0">All users</option>
        {users.map(user => (
          <option
            key={user.id}
            value={+user.id}
          >
            {user.name}
          </option>
        ))}
      </select>
    </label>
  );
};

UserSelect.propTypes = {
  userId: PropTypes.number,
  setUserId: PropTypes.func.isRequired,
};

UserSelect.defaultProps = {
  userId: undefined,
};
