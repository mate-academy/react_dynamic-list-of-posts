import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import * as Services from '../utils/fetchClient';

export const UserSelector: React.FC = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Services.client
      .get<User[]>('/users')
      .then(fetchedUsers => {
        setUsers(fetchedUsers);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // TODO highlight selected users from params

  const toggleDropdown = () => {
    return !isLoading && setIsDropdownActive(state => !state);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsDropdownActive(false);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropdownActive && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users?.map(user => (
              <a
                key={user.id}
                href={`/user/${user.id}`}
                className={`dropdown-item ${user.id === selectedUser?.id ? 'is-active' : ''}`}
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
