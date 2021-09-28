import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api/users';

interface Props {
  onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const UserSelect: React.FC<Props> = ({ onSelect }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => setUsers(usersFromServer));
  }, []);

  return (
    <label>
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        onChange={onSelect}
      >
        <option value={0}>All users</option>
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
