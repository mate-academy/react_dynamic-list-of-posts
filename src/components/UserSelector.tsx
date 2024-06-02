/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import * as Services from '../utils/fetchClient';
import { Link, useParams } from 'react-router-dom';

export const UserSelector: React.FC = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams<{ userId: string }>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Services.client
      .get<User[]>('/users')
      .then(fetchedUsers => {
        setUsers(fetchedUsers);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const user = users.find(user => user.id.toString() === userId);

    setSelectedUser(user || null);
  }, [userId, users]);

  const toggleDropdown = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleUserSelect = (user: User) => {
    setIsDropdownActive(false);
    setSelectedUser(user);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownActive(false);
    }
  };

  useEffect(() => {
    if (isDropdownActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownActive]);

  return (
    <div
      data-cy="UserSelector"
      className={`dropdown${isDropdownActive ? ' is-active' : ''}`}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
          disabled={isLoading}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className={`dropdown-menu${isDropdownActive && !isLoading ? ' is-active' : ''}`}
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users?.map(user => (
            <Link
              key={user.id}
              to={`/user/${user.id}`}
              className={`dropdown-item${user.id === selectedUser?.id ? ' is-active' : ''}`}
              onClick={() => handleUserSelect(user)}
            >
              {user.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
