import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../../api/users';

export const UserSelect = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const usersFromServer = await getUsers();

        setUsers(usersFromServer);
      } catch (error) {
        setErrorMessage(`${error}`);
      }
    };

    fetchUsers();
  }, []);

  if (errorMessage) {
    return <h2>{errorMessage}</h2>;
  }

  return (
    <label>
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        value={selectedUser}
        onChange={event => setSelectedUser(event.target.value)}
      >
        <option value="All">All users</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </label>
  );
};

UserSelect.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
};
