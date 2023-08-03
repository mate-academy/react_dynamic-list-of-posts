import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useUser } from '../hooks/useUser';
import { IUser } from '../models/IUser';

export const UserSelector: React.FC = () => {
  const { users, selectedUser, onUserSelect } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const outsideClickRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    const dropdown = outsideClickRef.current;

    if (dropdown && !dropdown.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideDropdown);

    return () => {
      document.removeEventListener('click', handleClickOutsideDropdown);
    };
  }, []);

  const handleUserSelecting = (user: IUser) => {
    onUserSelect(user);

    setIsDropdownOpen(false);
  };

  return (
    <div
      ref={outsideClickRef}
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropdownOpen,
      })}
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
          {
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => handleUserSelecting(user)}
              >
                {user.name}
              </a>
            ))
          }
        </div>
      </div>
    </div>
  );
};
