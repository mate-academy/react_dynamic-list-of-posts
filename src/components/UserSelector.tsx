import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { User } from '../types/User';
import { UserLink } from './User';

interface Props {
  users: User[],
  selectedUser: User | null,
  updateSelectedUser: (el: User | null) => void,
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  updateSelectedUser,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!dropdownMenuRef.current?.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const updateUserAndPosts = (currUser: User) => {
    updateSelectedUser(currUser);
    setIsMenuOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isMenuOpen })}
      ref={dropdownMenuRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span>
            {!selectedUser
              ? 'Choose a user'
              : selectedUser.name}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(({
            id, name, email, phone,
          }) => (
            <UserLink
              id={id}
              name={name}
              email={email}
              phone={phone}
              selectedUserId={selectedUser?.id}
              onClick={() => updateUserAndPosts({
                id, name, email, phone,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
