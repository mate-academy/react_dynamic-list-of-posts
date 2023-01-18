import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  value: User | null;
  onChange: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(0);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleUserSelection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    user: User,
  ) => {
    event.preventDefault();
    onChange(user);
    toggleDropdown();
    setCurrentUserId(user.id);
  };

  const handleDropdownClick = (event: React.MouseEvent) => {
    if (!isOpen) {
      setIsOpen(true);

      return;
    }

    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
      onFocus={handleOpen}
      onBlur={handleClose}
      onMouseDown={handleDropdownClick}
      role="button"
      tabIndex={0}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onMouseDown={toggleDropdown}
        >
          <span>
            { value ? value.name : 'Choose a user' }
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
                { 'is-active': user.id === currentUserId },
              )}
              key={user.id}
              onClick={(event) => handleUserSelection(event, user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
