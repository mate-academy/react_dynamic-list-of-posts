import React, { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { useOutsideClick } from '../types/useOutsideClick';

interface UserSelectorProps {
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  selectedUser,
  onUserSelect,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOutsideClick(dropdownRef, closeDropdown);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const usersData = await client.get<User[]>('/users');

        setUsers(usersData);
      } catch {
        // Error handling intentionally omitted as per requirements
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleUserClick = (user: User) => {
    onUserSelect(user);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  if (isLoading) {
    return (
      <div data-cy="UserSelector" className="dropdown">
        <div className="dropdown-trigger">
          <button type="button" className="button" disabled>
            Loading users...
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
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
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={e => {
                e.preventDefault();
                handleUserClick(user);
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
