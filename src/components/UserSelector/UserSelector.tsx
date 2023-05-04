import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  selectUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users, selectedUser, selectUser,
}) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const handleUserSelection = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => {
    event.preventDefault();

    selectUser(user);
    setIsDropdownMenuOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownMenuOpen })}
      onFocus={() => setIsDropdownMenuOpen(true)}
      onBlur={() => setIsDropdownMenuOpen(false)}
      onMouseDown={() => setIsDropdownMenuOpen(!isDropdownMenuOpen)}
      role="button"
      tabIndex={0}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user'}
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
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': user.id === selectedUser?.id },
              )}
              key={user.id}
              onMouseDown={(event) => {
                handleUserSelection(event, user);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
