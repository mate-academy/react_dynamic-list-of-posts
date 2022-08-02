import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/users';

type Props = {
  onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const UserSelect: React.FC<Props> = (props) => {
  const { onSelect } = props;
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    })();
  }, []);

  return (
    <label>
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        onChange={onSelect}
      >
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
