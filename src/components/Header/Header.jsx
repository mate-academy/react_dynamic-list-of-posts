import React from 'react';
import PropTypes from 'prop-types';

export const Header = ({ selector, setSelector, users }) => (
  <header className="App__header">
    <label>
      Select a user: &nbsp;
      <select
        className="App__user-selector"
        value={selector}
        onChange={e => setSelector(e.target.value)}
      >
        <option value="All users">All users</option>
        {users.map(user => (
          <option value={user.id} key={user.id}>{user.name}</option>
        ))}
      </select>
    </label>
  </header>
);

Header.propTypes = {
  selector: PropTypes.string.isRequired,
  setSelector: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
