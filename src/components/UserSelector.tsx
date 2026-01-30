import React, { useEffect, useRef } from 'react';
import { User } from '../types/User';
import cl from 'classnames';

type Props = {
  onToggle: () => void;
  onSelect: (user: User) => void;
  selectedUser: User | null;
  isActive: boolean;
  users: User[];
};

export const UserSelector: React.FC<Props> = ({
  onToggle,
  onSelect,
  selectedUser,
  isActive,
  users,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isActive, onToggle]);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={cl('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={onToggle}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

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
              onClick={e => {
                e.preventDefault();

                onSelect(user);
                onToggle();
              }}
              className={cl('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
