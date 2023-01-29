import React, { useState } from 'react';
import classNames from 'classnames';

import { User } from '../types/User';

type Props = {
  users: User[],
  activeUser: User | null,
  onOpeningPosts: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  activeUser,
  onOpeningPosts,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleDropDownBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    const parentContainer = event.currentTarget.parentElement?.parentElement;

    requestAnimationFrame(() => {
      if (!parentContainer?.contains(document.activeElement)) {
        setIsActive(false);
      }
    });
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        {
          'is-active': isActive,
        },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(!isActive)}
          onBlur={handleDropDownBlur}
        >
          <span>{activeUser ? activeUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  {
                    'is-active': activeUser && (activeUser.id === user.id),
                  },
                )}
                onClick={() => {
                  onOpeningPosts(user);
                  setIsActive(false);
                }}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
