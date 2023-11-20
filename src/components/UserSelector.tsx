import classNames from 'classnames';
import React from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  isDisplayed: boolean;
  setIsDisplayed: (arg: boolean) => void;
  onUserSelect: (user: User) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  isDisplayed,
  setIsDisplayed,
  onUserSelect,
  selectedUser,
}) => {
  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDisplayed,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDisplayed(!isDisplayed)}
          onBlur={() => setTimeout(() => setIsDisplayed(false), 150)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

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
                href={`#${user.email}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => onUserSelect(user)}
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
