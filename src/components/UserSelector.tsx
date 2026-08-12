import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
type Props = {
  users: User[];
  onLoadUsers: () => void;
  onSelectUser: (userId: number) => void;
  selectedUserId: number | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onLoadUsers,
  onSelectUser,
  selectedUserId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!isOpen && users.length === 0) {
      onLoadUsers();
    }

    setIsOpen(!isOpen);
  };

  const handleSelectUser = (userId: number) => {
    onSelectUser(userId);
    setIsOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          {!selectedUserId ? (
            <span>Choose a user</span>
          ) : (
            <span>{users.find(u => u.id === selectedUserId)?.name}</span>
          )}

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
              onClick={e => {
                e.preventDefault();
                handleSelectUser(user.id);
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
