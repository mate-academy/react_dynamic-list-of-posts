import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface UserSelectorProps {
  users: User[],
  onUserIdSelection: (id: number) => void,
}

export const UserSelector: React.FC<UserSelectorProps>
= ({ users, onUserIdSelection }) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(!isDropdownActive)}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                href={`#user-${id}`}
                className="dropdown-item"
                onClick={() => {
                  onUserIdSelection(id);
                  setIsDropdownActive(false);
                }}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
