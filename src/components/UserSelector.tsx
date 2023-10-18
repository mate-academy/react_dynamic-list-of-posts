import React, { useState } from 'react';
import cn from 'classnames';

import { usePosts } from '../hooks/usePosts';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
  } = usePosts();

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsDropdownActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn(
        'dropdown',
        {
          'is-active': isDropdownActive,
        },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(!isDropdownActive)}
        >
          <span>
            {selectedUser ? (
              selectedUser.name
            ) : (
              'Choose a user'
            )}
          </span>

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
          {users?.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className="dropdown-item"
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
