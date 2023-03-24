import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type UserSelectorProps = {
  visibleUsers: User[],
};

export const UserSelector: React.FC<UserSelectorProps> = ({ visibleUsers }) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isListOpen },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setIsListOpen((current) => !current);
          }}
          onMouseEnter={() => {
            setIsActive(true);
          }}
          onMouseLeave={() => {
            setIsActive(false);
          }}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {visibleUsers.map((user) => (
            <a
              href={`#${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': isActive },
              )}
              key={user.id}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
