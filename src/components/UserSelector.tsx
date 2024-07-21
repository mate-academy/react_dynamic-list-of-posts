import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../api/users';

interface Props {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDropdownShown, setIsDropdownShown] = useState<boolean>(false);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setIsDropdownShown(false);
    }, 200);
  }, []);

  useEffect(() => {
    getUsers().then(data => {
      setUsers(data);
    });
  }, []);

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownShown(currentState => !currentState)}
          onBlur={handleBlur}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropdownShown && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                key={user.id}
                onClick={() => setSelectedUser(user)}
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
