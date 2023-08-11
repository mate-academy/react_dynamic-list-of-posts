import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUser: User | null,
  setSelectedUser: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const hasUserSelected = (user: User) => (
    selectedUser && (selectedUser.id === user.id)
  );

  const toggleDropdown = () => {
    setIsDropdownActive(currentState => !currentState);
  };

  const handleUserSelect = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => {
    event.preventDefault();
    toggleDropdown();

    if (!hasUserSelected(user)) {
      setSelectedUser(user);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn(
        'dropdown',
        { 'is-active': isDropdownActive },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          <span>
            {selectedUser
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
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn(
                'dropdown-item',
                { 'is-active': hasUserSelected(user) },
              )}
              onClick={(event) => handleUserSelect(event, user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
