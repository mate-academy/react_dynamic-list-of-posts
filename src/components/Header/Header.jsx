import React from 'react';
import PropTypes from 'prop-types';

export const Header = ({
  filterByPosts,
  setUserSelect,
  userSelect,
  users,
}) => (
  <header className="App__header">
    <label>
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        name="user"
        value={userSelect}
        onChange={({ target }) => {
          setUserSelect(target.value);
          filterByPosts(target.value);
        }}
      >
        <option value="0">All users</option>
        {users.map(person => (
          <option
            key={person.id}
            value={person.id}
          >
            {person.name}
          </option>
        ))}

      </select>
    </label>
  </header>
);

Header.propTypes = {
  filterByPosts: PropTypes.func.isRequired,
  setUserSelect: PropTypes.func.isRequired,
  userSelect: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  })).isRequired,
};
