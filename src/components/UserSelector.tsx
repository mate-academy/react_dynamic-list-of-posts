import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  onSelectedUser: (user: User) => void;
};

const UserSelectorComponent: React.FC<Props> = ({
  users,
  selectedUser,
  isLoading,
  onSelectedUser,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSelectUser = (user: User) => {
    onSelectedUser(user);
    setIsDropdownVisible(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownVisible,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          onBlur={() => setIsDropdownVisible(false)}
          disabled={isLoading}
        >
          <span>
            {isLoading
              ? 'Users loading'
              : selectedUser
                ? selectedUser.name
                : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onMouseDown={() => handleSelectUser(user)}
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

export const UserSelector = React.memo(UserSelectorComponent);
