import React, { useState, useEffect } from 'react';
import './Select.scss';
// import PropTypes from 'prop-types';
import { getUsersList } from '../../api/users';

export const Select = () => {
  const [usersList, setUsersList] = useState([]);

  const loadNames = async() => {
    const loadedNames = await getUsersList();

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

Select.propTypes = {};
