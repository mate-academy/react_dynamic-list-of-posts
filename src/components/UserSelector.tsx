import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { getUsers } from '../api/fetchUsers';
import { User } from '../types/User';

interface UserSelectorProps {
  selectedUserId: number | null;
  onSelectUser: (userId: number) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  selectedUserId,
  onSelectUser,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsers()
      .then(fetchedUsers => {
        setUsers(fetchedUsers);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load users. Please try again.');
      });
  }, []);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isActive]);

  const toggleActive = () => {
    setIsActive(prev => !prev);
  };

  const selectUser = (userId: number) => {
    onSelectUser(userId);
    setIsActive(false);
  };

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown ', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleActive}
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
          {error && (
            <p className="has-text-danger" data-cy="UsersLoadingError">
              {error}
            </p>
          )}
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUserId === user.id,
              })}
              onClick={e => {
                e.preventDefault();
                selectUser(user.id);
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
