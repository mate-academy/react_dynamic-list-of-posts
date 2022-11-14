import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

interface Props {
  users: User[];
  selectUser: (user: User) => void;
  selectedUser: User | undefined;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectUser,
  selectedUser,
}) => {
  const [contentIsVisible, setContentIsVisible] = useState(false);

  const dropdownHandler = () => {
    setContentIsVisible(!contentIsVisible);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': contentIsVisible },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={dropdownHandler}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => (
            <a
              href={`#user-${user.id}`}
              className="dropdown-item"
              key={user.id}
              onClick={() => {
                selectUser(user);
                setContentIsVisible(false);
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
