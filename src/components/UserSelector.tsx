import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface UserSelectorProps {
  users: User[],
  selectedUser: User | null,
  userSelectedId: (user: User) => void,
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUser,
  userSelectedId,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
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
      className={classNames('dropdown', {
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
          onClick={() => setIsDropdownActive(!isDropdownActive)}
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
                key={id}
                href={`#user-${id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': id === selectedUser?.id },
                )}
                onClick={() => {
                  userSelectedId(user);
                  setIsDropdownActive(false);
                }}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
