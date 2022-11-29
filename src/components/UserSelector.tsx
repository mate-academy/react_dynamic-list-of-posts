import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  onUserSelect: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onUserSelect,
}) => {
  const [selectUser, setSelectUser] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState('Choose a user');

  const isDropdownVisible = (isVisible: boolean) => {
    setSelectUser(isVisible);
  };

  const handleUserSelection = (user: User) => {
    onUserSelect(user);
    setSelectUser(false);
    setSelectedUserName(user.name);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        {
          'is-active': selectUser,
        },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => isDropdownVisible(true)}
          onBlur={() => isDropdownVisible(false)}
        >

          <span>{selectedUserName || 'Choose a user'}</span>

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
              href={`#${user.id}`}
              className={classNames(
                'dropdown-item',
                {
                  'is-active': selectedUserName === user.name,
                },
              )}
              onMouseDown={() => handleUserSelection(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
