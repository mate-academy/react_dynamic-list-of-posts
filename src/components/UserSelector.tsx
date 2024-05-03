import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useAppContext } from '../context/store';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLInputElement | null>(null);
  const {
    state: { users, selectedUser },
    methods: { setSelectedUser },
  } = useAppContext();

  const handleSelect = (user: User) => {
    setSelectedUser(user);
    setIsVisible(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isVisible]);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isVisible })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsVisible(!isVisible)}
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
              href="#user-{user.id}"
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={() => handleSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
