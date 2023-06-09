import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Prop = {
  users: User[],
  selectedUser: User | null,
  saveSelectedUser: (user: User) => void,
};

export const UserSelector: React.FC<Prop> = ({
  users,
  selectedUser,
  saveSelectedUser,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(!isActive)}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user, index) => (
            <a
              key={user.id}
              href={`#user-${index}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': user.id === selectedUser?.id },
              )}
              onClick={() => {
                saveSelectedUser(user);
                setIsActive(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
