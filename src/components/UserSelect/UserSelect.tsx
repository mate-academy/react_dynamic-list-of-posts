import React, { useEffect, useState } from 'react';

import { userRequest } from '../../api/users';

type Props = {
  setUser: React.Dispatch<React.SetStateAction<number>>;
};

export const UserSelect: React.FC<Props> = ({ setUser }) => {
  const [users, setUsers] = useState([] as UserTypes[]);

  useEffect(() => {
    userRequest()
      .then(userData => setUsers(userData));
  }, []);

  return (
    users && (
      <label htmlFor="user-select">
        Select a user: &nbsp;

        <select
          className="App__user-selector"
          id="user-select"
          onChange={(event) => {
            setUser(+event.target.value);
          }}
        >
          <option value="0">All users</option>
          {users.map((user: UserTypes) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </label>
    )
  );
};
