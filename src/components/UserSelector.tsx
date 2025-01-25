import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

interface UserSelectorProps {
  users: User[];
  activeUser: User | null;
  handleActiveUser: (user: User) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  activeUser,
  handleActiveUser,
}) => {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsActiveDropdown(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={classNames('dropdown', { 'is-active': isActiveDropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActiveDropdown(!isActiveDropdown)}
        >
          <span>{activeUser ? activeUser.name : 'Choose a user'}</span>

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
              className={classNames('dropdown-item', {
                'is-active': user.id === activeUser?.id,
              })}
              key={user.id}
              onClick={event => {
                event.preventDefault();
                handleActiveUser(user);
              }}
              onMouseUp={() => setIsActiveDropdown(false)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
