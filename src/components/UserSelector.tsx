import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[],
  isDropdown: boolean,
  handleDropdown: (isDropdown: boolean) => void,
  selectedUser: User | null,
  handleSelectedUser: (selectedUserId: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  users, isDropdown, handleDropdown, selectedUser,
  handleSelectedUser,
}) => {
  const handleUserSelect = (user: User) => {
    if (user !== selectedUser) {
      handleDropdown(false);
      handleSelectedUser(user);
    }
  };

  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (dropdown.current
        && isDropdown
        && !dropdown.current.contains(e.target as Node)) {
        handleDropdown(false);
      }
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [isDropdown]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdown })}
    >
      <div className="dropdown-trigger" ref={dropdown}>
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => handleDropdown(!isDropdown)}
        >
          <span>
            {selectedUser?.name ? selectedUser.name : 'Choose a user'}
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
              className="dropdown-item"
              key={user.id}
              onClick={() => handleUserSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
