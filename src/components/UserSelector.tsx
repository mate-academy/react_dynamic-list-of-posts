import classNames from 'classnames';
import React, { useState } from 'react';
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
  const [visibility, setVisibility] = useState(false);

  const handleDropDownBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    const parentContainer = event.currentTarget.parentElement?.parentElement;

    requestAnimationFrame(() => {
      if (!parentContainer?.contains(document.activeElement)) {
        setVisibility(false);
      }
    });
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setVisibility(!visibility)}
          onBlur={handleDropDownBlur}
        >
          <span>{activeUser ? activeUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {visibility && users.length > 0 && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              return (
                <a
                  href={`#user-${user.id}`}
                  className={classNames(
                    'dropdown-item',
                    {
                      'is-active': activeUser && (activeUser.id === user.id),
                    },
                  )}
                  key={user.id}
                  onClick={() => {
                    onOpeningPosts(user);
                    setVisibility(false);
                  }}
                >
                  {user.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
