import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../GlobalContext';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const { users, selectedUser, setSelectedUser } = useContext(GlobalContext);

  const [isActiveDropdown, setIsActiveDropdown] = useState(false);

  const handleDropdown = () => {
    setIsActiveDropdown(!isActiveDropdown);
  };

  const handleSelectedUser = (user: User) => {
    setSelectedUser(user);
    setIsActiveDropdown(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActiveDropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdown}
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

      <div
        role="menu"
        id="dropdown-menu"
        className="dropdown-menu"
        style={{ maxHeight: '400px', overflowY: 'auto' }}
      >
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => handleSelectedUser(user)}
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
