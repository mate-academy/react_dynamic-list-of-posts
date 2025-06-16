import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
          {users.map((user: User) => (
            <a
              href={`#${user.id}`}
              key={user.id}
              onClick={() => {
                setSelectedUser(user);
                setIsOpen(false);
              }}
              className={`dropdown-item ${selectedUser !== null && user.id === selectedUser.id ? 'is-active' : ''}`}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
