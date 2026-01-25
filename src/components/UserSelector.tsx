import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { Loader } from './Loader';

type Props = {
  users: User[];
  selectedUserId: number | null;
  onUserSelect: (userId: number) => void;
  isLoading: boolean;
  hasError: boolean;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onUserSelect,
  isLoading,
  hasError,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (userId: number) => {
    onUserSelect(userId);
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

  const selectedUserName = selectedUserId
    ? users.find(u => u.id === selectedUserId)?.name
    : null;

  return (
    <div
      ref={rootRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
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
                onClick={event => {
                  event.preventDefault();
                  handleSelect(user.id);
                }}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUserId,
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
