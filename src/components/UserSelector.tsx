import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  user: User | null;
  onSetUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  user: chooseUser,
  onSetUser,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isActive },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(true)}
        >
          <span>{chooseUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <ul className="dropdown-content">
          {users.map(user => (
            <li key={user.id}>
              <a
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={() => {
                  onSetUser(user);
                  setIsActive(false);
                }}
              >
                {user.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
