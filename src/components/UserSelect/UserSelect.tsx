import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/users';
import './UserSelect.scss';

type Props = {
  selectUser: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const UserSelect: React.FC<Props> = (props) => {
  const { selectUser } = props;
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then(user => setUsers(user));
  }, []);

  return (
    users && (
      <label>
        Select a user: &nbsp;
        <select
          className="App__user-selector"
          onChange={selectUser}
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
    )
  );
};
