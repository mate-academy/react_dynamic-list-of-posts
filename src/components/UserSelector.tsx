import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  selectedUser: User | null;
  users: User[];
  onUserSelected: (user: User) => void;
  isError: boolean;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  users,
  onUserSelected,
  isError,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserSelect = (user: User) => {
    onUserSelected(user);
    setIsMenuOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isMenuOpen },
      )}
    >
      <div className="dropdown-trigger">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          disabled={isError}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
        >
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': selectedUser?.id === user.id },
                )}
                onClick={() => handleUserSelect(user)}
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
