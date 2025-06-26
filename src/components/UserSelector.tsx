import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';

interface UserSelectorProps {
  userList: User[];
  selectedUser: User | null;
  onUserSelect: (userId: number) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  userList,
  selectedUser,
  onUserSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {selectedUser !== null && selectedUser.name !== ''
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
          {userList.map((user: User) => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={`dropdown-item ${selectedUser !== null && user.id === selectedUser.id ? 'is-active' : ''}`}
              onClick={e => {
                e.preventDefault();
                onUserSelect(user.id);
                setIsOpen(false);
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
