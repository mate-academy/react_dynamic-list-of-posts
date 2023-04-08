import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type PropsType = {
  users: User[];
  selectUser: (user: User) => void;
  selectedUser: User;
};

export const UserSelector: React.FC<PropsType> = ({
  users,
  selectUser,
  selectedUser,
}) => {
  const [isChoosing, setIsChoosing] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isChoosing },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsChoosing(state => !state)}
          onBlur={() => setIsChoosing(false)}
        >
          {selectedUser.id !== 0
            ? (
              <span>{selectedUser.name}</span>

            )
            : (
              <span>Choose a user</span>

            )}
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { id } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': selectedUser.id === id },
                )}
                onMouseDown={() => selectUser(user)}
                onClick={() => setIsChoosing(false)}
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
