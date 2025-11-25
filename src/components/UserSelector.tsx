import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface UserSelectorProps {
  users: User[];
  selectedUserId: number | null;
  setSelectedUserId: (userId: number | null) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUserId,
  setSelectedUserId,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedUser = users.find(user => user.id === selectedUserId);
  const buttonText = selectedUser ? selectedUser.name : 'Choose a user';

  const handleSelectUser = (userId: number | null) => {
    setSelectedUserId(userId);
    setIsDropdownActive(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownActive(prev => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isDropdownActive &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDropdownActive]);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={classNames('dropdown is-fullwidth', {
        'is-active': isDropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button is-fullwidth"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownToggle}
        >
          <span>{buttonText}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <div
            className={classNames('dropdown-item', {
              'is-active': selectedUserId === null,
            })}
            onClick={() => handleSelectUser(null)}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelectUser(null);
              }
            }}
          >
            Choose a user
          </div>
          <hr className="dropdown-divider" />

          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUserId,
              })}
              key={user.id}
              onClick={e => {
                e.preventDefault();
                handleSelectUser(user.id);
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
