import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { Loader } from './Loader';

type Props = {
  users: User[];
  selectedUserId: number | null;
  onSelect: (userId: number | null) => void;
  isLoading: boolean;
  hasError: boolean;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onSelect,
  isLoading,
  hasError,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleBlur = (e: React.FocusEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;

    if (!relatedTarget || !dropdownRef.current?.contains(relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={classNames('dropdown', { 'is-active': isDropdownOpen })}
      data-cy="UserSelector"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownOpen(current => !current)}
          onBlur={handleBlur}
        >
          <span>
            {users.find(user => user.id === selectedUserId)?.name ||
              'Choose a user'}
          </span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {isLoading ? (
            <Loader />
          ) : hasError ? (
            <span className="dropdown-item">Error loading users</span>
          ) : (
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUserId,
                })}
                tabIndex={0}
                onBlur={handleBlur}
                onClick={() => {
                  onSelect(user.id);
                  setIsDropdownOpen(false);
                }}
              >
                {user.name}
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
