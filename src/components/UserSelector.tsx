import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUser: number | null,
  onSelectUser: (userId: number, userName: string) => void,
  selectedUserName: string,
};

export const UserSelector: React.FC<Props> = ({
  users,
  onSelectUser,
  selectedUser,
  selectedUserName,
}) => {
  const [showUserList, setShowUserList] = useState(false);

  const toggleUsersList = () => {
    setShowUserList(!showUserList);
  };

  const handleButtonToggler = () => {
    toggleUsersList();
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': showUserList },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleButtonToggler}
        >
          <span>{selectedUserName || 'Choose a user'}</span>

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
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': selectedUser === user.id },
              )}
              onClick={() => {
                onSelectUser(user.id, user.name);
                toggleUsersList();
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
