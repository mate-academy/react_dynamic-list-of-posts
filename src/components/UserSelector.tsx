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
  const [expandedList, setExpandedList] = useState<boolean>(false);

  const handleList = () => {
    setExpandedList((prev) => !prev);
  };

  const handleUserId = (id: number) => {
    setUserId(id);
    handleList();
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
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleList}
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
        {expandedList && (
          <ul className="dropdown-content">
            {users.map((item) => (
              <a
                href={`#user-${item.id}`}
                className={classNames('dropdown-item',
                  { 'is-active': item.id === userId })}
                onClick={() => handleUserId(item.id)}
                key={item.id}
              >
                {item.name}
              </a>
            ))}

          </ul>
        )}
      </div>
    </div>
  );
};
