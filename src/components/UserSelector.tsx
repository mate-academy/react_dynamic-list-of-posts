import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { UserContext } from '../UserProvider';

export const UserSelector: React.FC = () => {
  const { users, setSelectedUser, selectedUser } = useContext(UserContext);

  const [isActiveDropdown, setIsActiveDropdown] = useState<boolean>(false);

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
          onBlur={() => setIsActiveDropdown(false)}
          onClick={() => setIsActiveDropdown(!isActiveDropdown)}
        >
          <span>{selectedUser?.name ?? 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => (
            <a
              key={user.id}
              onMouseDown={() => setSelectedUser(user)}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item',
                { 'is-active': user.id === selectedUser?.id })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
