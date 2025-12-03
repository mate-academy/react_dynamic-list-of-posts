import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import { Loader } from './Loader';

type Props = {
  users: User[];
  selectedUserId: number | null;
  onSelectedUser: (userId: number) => void;
  isLoading: boolean;
  hasError: boolean;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onSelectedUser,
  isLoading,
  hasError,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selectedUserName = users.find(u => u.id === selectedUserId)?.name;

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (userId: number) => {
    onSelectedUser(userId);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;

      if (!rootRef.current || !target) {
        return;
      }

      if (!rootRef.current.contains(target)) {
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
      ref={rootRef}
      data-cy="UserSelector"
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggle}
        >
          <span>{selectedUserName || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {isLoading && (
            <div className="dropdown-item">
              <Loader />
            </div>
          )}

          {hasError && (
            <div className="dropdown-item has-text-danger">
              Failed to load users
            </div>
          )}
          {!isLoading &&
            !hasError &&
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={`dropdown-item ${selectedUserId === user.id ? 'is-active' : ''}`}
                onClick={event => {
                  event.preventDefault();
                  handleSelect(user.id);
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
