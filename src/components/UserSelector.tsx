import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';

type UserSelectorProps = {
  users: User[];
  user: User | null;
  onUserSelect: (user: User) => void;
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  user,
  onUserSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      ref={menuRef}
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span>{user ? user.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(currUser => (
            <a
              key={currUser.id}
              href={`#user-${currUser.id}`}
              className={`dropdown-item ${user?.id === currUser.id ? 'is-active' : ''}`}
              onClick={e => {
                e.preventDefault();
                onUserSelect(currUser);
                setIsOpen(false);
              }}
            >
              {currUser.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
