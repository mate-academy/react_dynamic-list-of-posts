import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../GlobalContext';
import { UserItem } from './UserItem';

export const UserSelector: React.FC = () => {
  const { users, selectedUser } = useContext(GlobalContext);

  const [isActiveDropdown, setIsActiveDropdown] = useState(false);

  const handleDropdown = () => {
    setIsActiveDropdown(!isActiveDropdown);
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
          {users.map(user => (
            <UserItem
              key={user.id}
              user={user}
              setIsActiveDropdown={setIsActiveDropdown}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
