import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUserId: number | null;
  onUserSelected: (id: number) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onUserSelected,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const selectedUser = users.find(user => user.id === selectedUserId);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelectUser = (user: User) => {
    onUserSelected(user.id);
    setIsDropdownActive(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownActive(prevState => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className={classNames('button', {
            'is-active': isDropdownActive,
          })}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          disabled={users.length === 0}
          onClick={handleDropdownToggle}
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
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUserId,
              })}
              key={user.id}
              onClick={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
