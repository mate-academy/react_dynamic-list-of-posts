import React, { useState, useEffect } from 'react';

import { loadUsers } from '../../api/users';

type Props = {
  selectorValue: number
  handleSelector: (event: React.ChangeEvent<HTMLSelectElement>) => void
};

export const UsersList: React.FC<Props> = React.memo(
  ({ selectorValue, handleSelector }) => {
    const [users, setUsers] = useState<User[]>([]);

    const getUsers = async () => {
      const usersFromServer = await loadUsers();

      setUsers(usersFromServer);
    };

    useEffect(() => {
      getUsers();
    }, []);

    return (
      <>
        <select
          className="App__user-selector"
          value={selectorValue}
          onChange={handleSelector}
        >
          <option value="0">All users</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </>
    );
  },
);
