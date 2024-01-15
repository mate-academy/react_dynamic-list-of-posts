import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { UserItem } from './UserItem';
import { useAppContext } from '../context/AppContext';

export const UserSelector: React.FC = () => {
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);
  const { users, selectedUser } = useAppContext();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleDropdown = () => {
    setIsDropdownActive(prev => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownActive(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      handleDropdown();
    }
  }, [selectedUser]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
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
          onClick={handleDropdown}
        >
          {
            selectedUser !== null
              ? <span>{selectedUser.name}</span>
              : <span>Choose a user</span>
          }

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
          {
            users.length > 0
              ? users.map(user => (
                <UserItem key={user.id} user={user} />
              ))
              : <p>No users loaded</p>
          }
        </div>
      </div>
    </div>
  );
};
