import cn from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

interface Props {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  usersFromServer: User[] | null;
}

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
  usersFromServer,
}) => {
  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <div
      aria-hidden
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': dropdownActive })}
      onClick={() => setDropdownActive(state => !state)}
      // onBlur={() => setDropdownActive(false)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersFromServer && usersFromServer.map(user => (
            <a
              href="#user-2"
              key={user.id}
              className={cn(
                'dropdown-item',
                { 'is-active': user.id === selectedUser?.id },
              )}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
