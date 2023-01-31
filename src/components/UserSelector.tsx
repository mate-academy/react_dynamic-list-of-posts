import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectUser: (user: User) => void,
  selectedUser: User | null,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectUser,
  selectedUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSelectUser = (user: User) => {
    selectUser(user);
    setIsOpen(!isOpen);
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  {
                    'is-active': false,
                  },
                )}
                key={user.id}
                onClick={() => onSelectUser(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
