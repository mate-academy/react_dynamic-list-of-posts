import React, { useState } from 'react';
import classNames from 'classnames';

import { User } from '../types/User';

type Props = {
  users: User[];
  onLoadPosts: (userId: number) => Promise<void>;
};

export const UserSelector: React.FC<Props> = ({ users, onLoadPosts }) => {
  const [isActive, setIsActive] = useState(false);

  const handleOpenDropdown = () => {
    setIsActive(!isActive);
  };

  const handleLoadPosts = (userId: number) => {
    onLoadPosts(userId);

    setIsActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isActive },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpenDropdown}
        >
          <span>Choose a user</span>

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
              className="dropdown-item"
              onClick={() => handleLoadPosts(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
