import React, { useState, useEffect } from 'react';
import './UserSelect.scss';
// import PropTypes from 'prop-types';
import { getUsers } from '../../api/users';

export const UserSelect = () => {
  const [usersList, setUsersList] = useState([]);

  const loadNames = async() => {
    const loadedNames = await getUsers();

    setUsersList(loadedNames);
  };

  useEffect(() => {
    loadNames();
  }, []);

  return (
    <header className="App__header">
      <label>
        Select a user: &nbsp;

        <select className="App__user-selector">
          {usersList.map(user => (
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

UserSelect.propTypes = {};
