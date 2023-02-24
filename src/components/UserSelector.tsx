import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[] | null,
  selectedUser: User | null,
  selectUser: (user: User) => Promise<void>,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  selectUser,
}) => {
  const [isDropdown, setIsDropdown] = useState(false);

  const selectingUser = (user: User) => () => {
    selectUser(user);
    setIsDropdown(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isDropdown },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdown(!isDropdown)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users && users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': selectedUser && selectedUser.id === user.id },
              )}
              key={user.id}
              onClick={selectingUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
