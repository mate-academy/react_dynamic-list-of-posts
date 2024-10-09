import React, { useCallback, useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';
import { getUsers } from '../api/users';

type Props = {
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  onSelectUser,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadUsers = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  }, []);

  const handleUserSelect = useCallback(
    (user: User) => {
      onSelectUser(user);
      setIsDropdownOpen(false);
    },
    [onSelectUser],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropdownOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {!error &&
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => handleUserSelect(user)}
              >
                {user.name}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
