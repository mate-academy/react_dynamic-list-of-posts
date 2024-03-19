import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: number;
  setSelectedUser: React.Dispatch<React.SetStateAction<number>>;
};

export const UserSelector: React.FC<Props> = React.memo(
  ({ users, selectedUser, setSelectedUser }) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleSelectUser = (id: number) => {
      setSelectedUser(id);
      setShowDropdown(false);
    };

    return (
      <div
        data-cy="UserSelector"
        className={classNames('dropdown', {
          'is-active': showDropdown,
        })}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={() => setShowDropdown(prev => !prev)}
            onBlur={() => setShowDropdown(false)}
          >
            <span>
              {!selectedUser
                ? 'Choose a user'
                : users.find(user => user.id === selectedUser)?.name}
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
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser,
                })}
                onMouseDown={() => handleSelectUser(user.id)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
