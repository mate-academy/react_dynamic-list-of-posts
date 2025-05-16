import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface UserSelectorProps {
  users: User[];
  selectedUserId: number | null;
  onSelect: (userId: number | null) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUserId,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedUser = users.find(user => user.id === selectedUserId);
  const displayName = selectedUser?.name || 'Choose a user';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const wasClickInside = dropdownRef.current?.contains(
        event.target as Node,
      );

      if (!wasClickInside) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(prevState => !prevState);

  const handleUserSelection = (e: React.MouseEvent, userId: number) => {
    e.preventDefault();

    onSelect(userId);
    setIsOpen(false);
  };

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
          <span>{displayName}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const isSelected = user.id === selectedUserId;

            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': isSelected,
                })}
                onClick={e => handleUserSelection(e, user.id)}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
