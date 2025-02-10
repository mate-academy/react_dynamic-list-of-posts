import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useLoadUsers } from '../utils/hooks';
import { UserItem } from './UserItem';
import { User } from '../types/User';

type Props = {
  onSelect: (user: User) => void;
  onError: (error: string) => void;
  activeUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  onSelect,
  onError,
  activeUser,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const usersFromServer = useLoadUsers(onError);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleUserSelect = (user: User) => {
    onSelect(user);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropdownOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          {activeUser ? (
            <span>{activeUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersFromServer.map(user => (
            <UserItem
              key={user.id}
              user={user}
              onSelect={handleUserSelect}
              isActive={user.id === activeUser?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
