import React, { useState, useRef } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { useClickOutside } from '../hooks/useClickOutside';

interface Props {
  users: User[];
  onSelectUser: (selectedUser: User) => void;
  selectedUser: User | null;
}

export const UserSelector: React.FC<Props> = ({
  users,
  onSelectUser,
  selectedUser,
}) => {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsActive(false));

  const handleClickUser = (user: User) => {
    onSelectUser(user);
    setIsActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isActive })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(prev => !prev)}
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
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              key={user.id}
              onClick={event => {
                event.preventDefault();
                handleClickUser(user);
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
