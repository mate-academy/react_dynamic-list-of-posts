import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api/users';

type Props = {
  selectId: (id: string) => void,
};

export const SelectOfUsers: React.FC<Props> = React.memo(({ selectId }) => {
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    };

    fetchUsers();
  }, []);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUserId(value);
    selectId(value);
  };

  // eslint-disable-next-line no-console
  console.log('selectcomponent');

  return (
    <label htmlFor="select">
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        value={selectedUserId}
        onChange={handleSelect}
      >
        <option value="0">Choose user</option>
        {users.map(user => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </label>
  );
});
