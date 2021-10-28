import { useEffect, useState } from 'react';
import { getUsers } from '../../api/posts';
import { User } from '../../types/User';

type Props = {
  selectedUserId: number;
  setSelectedUserId: (userId: number)=> void;
  setDetailsAreShown: (isHidden: boolean) => void;
};

export const UserSelect: React.FC<Props> = ({
  selectedUserId,
  setSelectedUserId,
  setDetailsAreShown,
}) => {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    getUsers()
      .then((usersFromServer) => {
        setUsers(usersFromServer);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <label htmlFor="unique-id">
      <span id="unique-id">Select a user: &nbsp;</span>

      <select
        className="App__user-selector"
        value={selectedUserId}
        onChange={event => {
          setSelectedUserId(+event.target.value);
          setDetailsAreShown(false);
        }}
      >
        <option value="">Select user</option>
        {users.map((user: User) => (
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
