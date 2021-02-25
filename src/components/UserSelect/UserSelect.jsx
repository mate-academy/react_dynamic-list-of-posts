import React from 'react';
import PropTypes from 'prop-types';

export const UserSelect = ({ users, onChange }) => (
  <label>
    Select a user: &nbsp;

    <select
      className="App__user-selector"
      onChange={onChange}
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
);

UserSelect.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};
