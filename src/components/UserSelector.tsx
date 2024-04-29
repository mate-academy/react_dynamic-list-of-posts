import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[] | null;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users = [],
  selectedUser,
  setSelectedUser,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleSetUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleActivate = () => {
    setTimeout(() => setIsActive(!isActive), 10);
  };

  document.addEventListener('click', () => {
    setIsActive(false);
  });

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
          onClick={handleActivate}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
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
          {users?.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => handleSetUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
