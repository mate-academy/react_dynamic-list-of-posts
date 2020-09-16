import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../../api/users';

export const UserSelect = ({ select, name }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(result => setUsers(result.data
        .filter((user, i, arr) => user.address !== null
          && i === arr.findIndex(item => user.name === item.name))));
  }, []);

  return (
    <label>
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        value={name}
        onChange={(event) => {
          const { value } = event.target;

          if (value === 'All users') {
            select({ name: 'All users' });

            return;
          }

          const person = users.filter(user => user.name === value)[0];

          select(person);
        }}
      >
        <option value="All users">All users</option>
        {users.map(user => (
          <option
            value={user.name}
            key={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>
    </label>
  );
};

UserSelect.propTypes = {
  select: PropTypes.func.isRequired,
  name: PropTypes.string,
};

UserSelect.defaultProps = {
  name: '',
};
