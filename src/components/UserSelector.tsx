import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/Users';

interface Props {
  setSelectedUser: (user: User) => void;
  selectedUser: User | null;
}

export const UserSelector: React.FC<Props> = ({
  setSelectedUser,
  selectedUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isUsers, setIsUsers] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fUsers = await getUsers();

        setUsers(fUsers);
      } catch (error) {
      } finally {
      }
    };

    loadUsers();
  }, []);
  const handleUserSelect = async (user: User) => {
    setSelectedUser(user);
    setIsUsers(!isUsers);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          onClick={() => setIsUsers(!isUsers)}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          {selectedUser ? (
            <span className="dropdown-item">{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      {isUsers && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={() => handleUserSelect(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
