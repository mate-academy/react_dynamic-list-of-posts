import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';

interface Props {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleUserChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => {
    e.preventDefault();
    setSelectedUser(user);
    setIsDropdownShown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownShown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={`dropdown ${isDropdownShown ? 'is-active' : ''}`}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownShown(prev => !prev)}
        >
          {!selectedUser ? (
            <span>Choose a user</span>
          ) : (
            <span>{selectedUser.name}</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                href={`#user-${user.id}`}
                className={
                  'dropdown-item' + (selectedUser === user ? ' is-active' : '')
                }
                onClick={e => handleUserChange(e, user)}
                key={user.id}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
