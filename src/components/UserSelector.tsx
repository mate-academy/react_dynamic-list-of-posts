import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../api/mate';

interface Props {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpend, setIsOpend] = useState(false);

  const getUsersFromServer = useCallback(async () => {
    const result = await getUsers();

    setUsers(result);
  }, []);

  const handleToggleSelect = () => {
    setIsOpend(prev => !prev);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsOpend(false);
  };

  useEffect(() => {
    getUsersFromServer();
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isOpend },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggleSelect}
          onBlur={() => setIsOpend(false)}
        >
          <span>
            {
              selectedUser
                ? selectedUser.name
                : 'Choose a user'
            }
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': selectedUser?.id === user.id },
              )}
              onMouseDown={() => {
                handleSelectUser(user);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
