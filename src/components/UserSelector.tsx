import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useUsers } from '../hooks/UseUsers';
import { User } from '../types/User';

type Props = {
  onChange: (userId: number) => void;
};

export const UserSelector: React.FC<Props> = ({ onChange }) => {
  const { users, isLoading, hasError } = useUsers();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(prev => !prev);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleDocClick = (event: MouseEvent | TouchEvent) => {
      const root = rootRef.current;

      if (root && !root.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('touchstart', handleDocClick);

    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('touchstart', handleDocClick);
    };
  }, [isOpen]);

  const handleUserClick = (user: User) => {
    onChange(user.id);
    setCurrentUser(user);
    setIsOpen(false);
  };

  return (
    <div
      ref={rootRef}
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggle}
        >
          <span>{currentUser ? currentUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {isLoading && <div className="dropdown-item">Loading...</div>}

          {hasError && (
            <div className="dropdown-item has-text-danger">
              Failed to load users!
            </div>
          )}

          {!isLoading &&
            !hasError &&
            users.map(user => {
              const isActive = currentUser?.id === user.id;

              return (
                <a
                  key={user.id}
                  href={`#user-${user.id}`}
                  className={cn('dropdown-item', { 'is-active': isActive })}
                  onClick={() => {
                    handleUserClick(user);
                  }}
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
