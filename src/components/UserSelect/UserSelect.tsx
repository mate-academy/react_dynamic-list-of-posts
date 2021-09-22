import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/users';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const UserSelect: React.FC<Props> = (props) => {
  const { onChange } = props;
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    })();
  }, [users]);

  return (
    <label>
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        onChange={onChange}
      >
        <option value="0">All users</option>
        {users.map(user => (
          <option
            value={user.id}
            key={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>
    </label>
  );
};
