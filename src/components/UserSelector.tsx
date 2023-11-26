import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  handleUserSelect: (user: User) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  handleUserSelect,
  selectedUser,
}) => {
  const [isUsersVisible, setIsUsersVisible] = useState(false);

  const toggleUserVisibility = () => {
    setIsUsersVisible((visibility) => !visibility);
  };

  const handleUserClick = (user: User) => {
    handleUserSelect(user);
    setIsUsersVisible(false);
  };

  const closeDropdown = () => {
    setIsUsersVisible(false);
  };

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest('.dropdown')) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown',
        { 'is-active': isUsersVisible })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleUserVisibility}
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
              className="dropdown-item"
              onClick={() => handleUserClick(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
