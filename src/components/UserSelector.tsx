import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  activeUser: (id: number) => void;
};

export const UserSelector: React.FC<Props> = ({ users, activeUser }) => {
  const [userIsActive, setUserIsActive] = useState<User | null>(null);
  const [isDropdown, setIsDropdown] = useState(false);

  const handleDropdown = () => {
    setIsDropdown(prev => (prev ? false : true));
  };

  const handleActiveUser = (user: User) => {
    activeUser(user.id);
    setUserIsActive(user);
    setIsDropdown(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdown })}
      onBlur={() => setIsDropdown(false)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdown}
        >
          {userIsActive ? (
            <span>{userIsActive.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.length !== 0 &&
            users.map(user => (
              <a
                href={`#user-${user.id}`}
                key={user.id}
                className={classNames('dropdown-item', {
                  'is-active':
                    userIsActive !== null && userIsActive.id === user.id,
                })}
                onMouseDown={() => handleActiveUser(user)}
              >
                {user.name}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
