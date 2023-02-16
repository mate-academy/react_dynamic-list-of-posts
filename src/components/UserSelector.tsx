import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUserId: number;
  onSelectUserId: (userId: number) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onSelectUserId,
}) => {
  const [onOpenListUser, setOnOpenListUser] = useState(false);

  const selectedUser = users.find(
    user => user.id === selectedUserId,
  );

  const toggleUserList = () => {
    setOnOpenListUser(prev => !prev);
  };

  const onSelectUser = (userId: number) => {
    onSelectUserId(userId);
    toggleUserList();
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': onOpenListUser })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleUserList}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className="dropdown-item"
              onClick={() => onSelectUser(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
