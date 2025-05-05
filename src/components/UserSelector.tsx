import React, { useEffect, useRef } from 'react';
import { User } from '../types/User';

interface Props {
  users: User[];
  selectedUserId: number | null;
  onSelect: (userId: number) => void;
  isLoading: boolean;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onSelect,
  isLoading,
}) => {
  const [isActive, setIsActive] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={`dropdown ${isActive ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(!isActive)}
          disabled={isLoading}
        >
          <span>
            {selectedUserId
              ? users.find(u => u.id === selectedUserId)?.name
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
              className={`dropdown-item ${selectedUserId === user.id ? 'is-active' : ''}`}
              onClick={e => {
                e.preventDefault();
                onSelect(user.id);
                setIsActive(false);
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
