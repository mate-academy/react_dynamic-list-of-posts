import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../api/posts';

interface Props {
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  onUserSelect,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsers()
      .then(res => setUsers(res));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current
        && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleDropdownTrigger = () => {
    setIsDropdownActive(prev => !prev);
  };

  const handleSelect = (user: User) => {
    onUserSelect(user);
    handleDropdownTrigger();
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropdownActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownTrigger}
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user'}
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
        ref={dropdownRef}
      >
        <div className="dropdown-content">
          {users.map((user) => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={cn('dropdown-item',
                  { 'is-active': selectedUser?.id === id })}
                onClick={() => handleSelect(user)}
              >
                {name}
              </a>
            );
          })}

        </div>
      </div>
    </div>
  );
};
