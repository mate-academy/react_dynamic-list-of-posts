import React, { useRef, useState } from 'react';
import { User } from '../types/User';

interface Props {
  users: User[];
  selectedUserId: number | null;
  onSelectUser: (userId: number) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onSelectUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(prev => !prev);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          aria-expanded={isOpen}
          onClick={toggleDropdown}
        >
          <span>
            {selectedUserId
              ? users.find(user => user.id === selectedUserId)?.name
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
              href="#/"
              className={`dropdown-item ${
                user.id === selectedUserId ? 'is-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                onSelectUser(user.id);
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
