import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { User } from '../types/User';

interface UserSelectorProps {
  users: User[];
  selectedUserId: number | null;
  setSelectedUserId: (userId: number) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUserId,
  setSelectedUserId,
}) => {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsActiveDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleDropdown = () => {
    setIsActiveDropdown(current => !current);
  };

  const handleItemClick = (userId: number, event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedUserId(userId);
    setIsActiveDropdown(false);
  };

  const findUserName = () => {
    return users.find(user => user.id === selectedUserId)?.name;
  };

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isActiveDropdown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdown}
        >
          {selectedUserId !== null ? (
            <span>{findUserName()}</span>
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
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUserId,
              })}
              onClick={e => handleItemClick(user.id, e)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
