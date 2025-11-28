import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface UserSelectorProps {
  users: User[];
  selectedUserId: number | null;
  onUserSelect: (userId: number) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUserId,
  onUserSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const usersList = Array.isArray(users) ? users : [];
  const selectedUser = usersList.find(user => user.id === selectedUserId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleUserClick = (userId: number) => {
    onUserSelect(userId);
    setIsDropdownOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownToggle}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersList.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUserId,
              })}
              onClick={e => {
                e.preventDefault();
                handleUserClick(user.id);
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
