/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

export type UserSelectorProps = {
  users: User[]
  userId: number | null
  setUserId: (id: number) => void
};

export const UserSelector: React.FC<UserSelectorProps>
= ({ users, userId, setUserId }) => {
  const [isActive, setIsActive] = useState(false);

  const handleUserId = (id: number) => {
    setUserId(id);
    setIsActive(() => false);
  };

  const getUserName = () => {
    const user = users.find((item) => item.id === userId);

    if (user) {
      return (user.name);
    }

    return ('Choose a user');
  };

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
          onClick={() => setIsActive((prev) => !prev)}
        >
          <span>{getUserName()}</span>

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
          {users.map(({ id, name }) => (
            <a
              key={id}
              href={`#user-${id}`}
              className={classNames('dropdown-item',
                { 'is-active': id === userId })}
              onClick={() => handleUserId(id)}
            >
              {name}
            </a>
          ))}

        </div>

      </div>
    </div>
  );
};
