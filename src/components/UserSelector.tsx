import React, { useContext, useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import { UserItem } from './UserItem';
import cn from 'classnames';
import { PostsContext } from '../context/PostsContext';

interface UserSelectorProps {
  users: User[];
}

export const UserSelector: React.FC<UserSelectorProps> = ({ users }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedUser } = useContext(PostsContext);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      onClick={() => setIsOpen(!isOpen)}
      className={cn('dropdown', { 'is-active': isOpen })}
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
          {users.map(user => {
            return <UserItem key={user.id} user={user} />;
          })}
        </div>
      </div>
    </div>
  );
};
