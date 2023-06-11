import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

interface UserSelectorProps {
  users: User[];
  onSelectUser: (user: User | null) => void;
  selectedUser: User | null;
  isDropdownActive: boolean;
  setIsDropdownActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserSelector: React.FC<UserSelectorProps> = React.memo(({
  users,
  selectedUser,
  onSelectUser,
  isDropdownActive,
  setIsDropdownActive,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleUsersDropdown = (event: MouseEvent) => {
    if (dropdownRef.current
      && !dropdownRef.current.contains(event.target as HTMLDivElement)) {
      setIsDropdownActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleUsersDropdown);

    return () => {
      document.removeEventListener('mousedown', handleUsersDropdown);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropdownActive,
      })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(prevState => !prevState)}
        >
          <span>{selectedUser ? selectedUser?.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">

        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                href={`#user-${id}`}
                className={cn('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => onSelectUser(user)}
                key={id}
              >
                {name}
              </a>
            );
          })}
        </div>

      </div>
    </div>
  );
});
