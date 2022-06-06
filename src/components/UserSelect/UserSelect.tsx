import { useCallback, useEffect, useState } from 'react';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

interface Props {
  selectedUser: string,
  handleSelectedUser: (id: string) => void,
}

export const UserSelect: React.FC<Props> = ({
  selectedUser,
  handleSelectedUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  const getAllUsers = useCallback(async () => {
    const allUsers = await getUsers();

    setUsers(allUsers.slice(0, 10));
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <label>
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        value={selectedUser}
        onChange={({ target }) => handleSelectedUser(target.value)}
      >
        <option value="0">All users</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </label>
  );
};
