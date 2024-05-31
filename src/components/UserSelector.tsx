import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type Props = {
  users: User[];
  user: User | null;
  setUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({ users, user, setUser }) => {
  const [visibleDropdown, setVisibleDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setVisibleDropdown(false);
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
      className={cn('dropdown', { 'is-active': visibleDropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setVisibleDropdown(!visibleDropdown)}
        >
          <span>{user ? user.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(currentUser => (
            <a
              href={`#user-${currentUser.id}`}
              className={cn('dropdown-item', {
                'is-active': currentUser.id === user?.id,
              })}
              key={currentUser.id}
              onClick={() => {
                setUser(currentUser);
                setVisibleDropdown(false);
              }}
            >
              {currentUser.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
