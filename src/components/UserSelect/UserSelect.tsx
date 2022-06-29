import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../api/users';

interface Props {
  getSelectUser: (userId: number) => void,
  selectedUserId: number,
}
export const UserSelect: React.FC<Props> = (
  {
    selectedUserId,
    getSelectUser,
  },
) => {
  const [users, setUsers] = useState<User[] | null>(null);

  const loadAllUsersData = async () => {
    const gotUsers = await getAllUsers();

    setUsers(gotUsers);
  };

  useEffect(() => {
    loadAllUsersData();
  }, []);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    getSelectUser(+event.target.value);
  };

  return (
    <label>
      Select a user: &nbsp;
      <select
        className="App__user-selector"
        name="selectedUserId"
        value={selectedUserId}
        onChange={handleUserChange}
      >
        <option value={0}>All users</option>
        {users && (users.map(user => (
          <React.Fragment
            key={user.id}
          >
            <option value={user.id}>
              {user.name}
            </option>

          </React.Fragment>
        )))}

      </select>
    </label>
  );
};
