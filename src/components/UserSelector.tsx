import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type Props = {
  onError: () => void;
  onUserSelected: (user: User) => void;
  selectedUser: User | null;
};

const UserSelectorBase: React.FC<Props> = ({
  onError,
  onUserSelected,
  selectedUser,
}) => {
  const userSelectorRef = useRef<HTMLDivElement | null>(null);

  const [users, setUsers] = useState<User[]>([]);

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownActive(prevState => !prevState);
  };

  const handleSelectUser = (user: User) => {
    onUserSelected(user);
    setIsDropdownActive(false);
  };

  useEffect(() => {
    setIsLoading(true);

    getUsers()
      .then(setUsers)
      .catch(() => {
        setHasError(true);
        onError();
      })
      .finally(() => setIsLoading(false));
  }, [onError]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userSelectorRef.current &&
        !userSelectorRef.current.contains(event.target as Node)
      ) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={userSelectorRef}
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          disabled={hasError}
          onClick={handleDropdownToggle}
          type="button"
          className={cn('button', {
            'is-loading': isLoading,
          })}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
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

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              onClick={() => handleSelectUser(user)}
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const UserSelector = React.memo(UserSelectorBase);
