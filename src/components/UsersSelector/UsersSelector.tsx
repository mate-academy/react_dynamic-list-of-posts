import React, { useEffect, useState } from 'react';

import { getUsers } from '../../api/users';

type Props = {
  setCurrentUser: (value: number) => void;
};

export const UsersSelector: React.FC<Props> = ({ setCurrentUser }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => setUsers(usersFromServer));
  }, []);

  return (
    <label htmlFor="userSelect">
      Select a user: &nbsp;

      <select
        id="userSelect"
        className="App__user-selector"
        onChange={(event) => {
          setCurrentUser(+event.currentTarget.value);
        }}
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
};
