import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api/users';

export const UserSelect = () => {
  const [users, setUsers] = useState([]);
  const [chosenUser, setChosenUserdId] = useState(0);

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line
      .then((users) => {
        setUsers(users.data.map(({ name, id }) => ({
          name, userId: id,
        })));
      });
  }, []);

  const changeHandler = (e) => {
    setChosenUserdId(e.currentTarget.value);
  };

  return (
    <label>
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        value={chosenUser}
        onChange={changeHandler}
      >
        <option key="0" value="0">All users</option>
        {users.map(({ name, userId }) => (
          <option
            key={userId}
            value={userId}
          >
            {name}
          </option>
        ))}
      </select>
    </label>
  );
};
