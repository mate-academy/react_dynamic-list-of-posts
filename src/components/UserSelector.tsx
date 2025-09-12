import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type UserSelectorProps = {
  users: User[];
  setSelectedUserId: (id: number) => void;
  selectedUserId: number | undefined;
  setLoading: (isLoading: boolean) => void;
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  setSelectedUserId,
  selectedUserId,
  setLoading,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // 1. Create a ref to attach to the dropdown's main element
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 2. Add an effect to handle clicks outside the component
  useEffect(() => {
    // This function will be called on any click in the document
    const handleClickOutside = (event: MouseEvent) => {
      // If the ref exists and the clicked element is not inside the ref's element...
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // ...close the dropdown
        setIsDropdownOpen(false);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // This is a cleanup function: remove the listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // The empty array ensures this effect runs only once

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleUserSelect(id: number) {
    setSelectedUserId(id);
    setIsDropdownOpen(false);
    setLoading(true);
  }

  const selectedUser = users.find(user => user.id === selectedUserId) || null;

  return (
    <div
      // 3. Attach the ref to the main div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownOpen })}
      // We keep the onClick here to toggle the dropdown
      onClick={toggleDropdown}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
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
                'is-active': selectedUserId === user.id,
              })}
              // Prevent the main div's toggle from firing on item click
              onClick={(e) => {
                e.stopPropagation(); 
                handleUserSelect(user.id);
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