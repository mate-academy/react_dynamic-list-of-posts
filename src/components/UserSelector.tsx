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
    const [isDropdown, setIsDropdown] = useState<boolean>(false);

    const handleSelectUser = (id: number) => {
      setSelectedUser(id);
      setIsDropdown(false);
    };

    const chosenUser = users.find(user => user.id === selectedUser)?.name;

    return (
      <div
        data-cy="UserSelector"
        className={classNames('dropdown', {
          'is-active': isDropdown,
        })}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={() => setIsDropdown(prev => !prev)}
            onBlur={() => setIsDropdown(false)}
          >
            <span>{chosenUser || 'Choose a user'}</span>

            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>

        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              const { id, name } = user;

              return (
                <a
                  key={id}
                  href={`#user-${id}`}
                  className={classNames('dropdown-item', {
                    'is-active': id === selectedUser,
                  })}
                  onMouseDown={() => handleSelectUser(id)}
                >
                  {name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);

// Trying to remove this linter error on GitHub
// Error:   11:46  error  Component definition is missing display name  react/display-name
UserSelector.displayName = 'UserSelector';
