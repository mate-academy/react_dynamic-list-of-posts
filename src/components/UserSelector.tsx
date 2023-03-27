import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type UserSelectorProps = {
  visibleUsers: User[],
  setSelectedUserId: (userId: number) => void,
  setPostError: (state: boolean) => void,
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  visibleUsers,
  setSelectedUserId,
  setPostError,
}) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleUserOnclick = (userId: number) => {
    setSelectedUserId(userId);
    setPostError(false);
    setIsListOpen(false);
  };

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
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': isActive },
              )}
              key={user.id}
              onClick={() => handleUserOnclick(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
