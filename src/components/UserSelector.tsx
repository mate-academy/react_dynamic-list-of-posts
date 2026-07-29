import React, { useEffect, useRef, useState } from 'react';
import { getUsers } from '../utils/services';
import { User } from '../types/User';
import cn from 'classnames';

interface Props {
  onUserSelect: (userId: number) => void;
  selectedUserId: number | null;
  userId: number;
}

export const UserSelector: React.FC<Props> = ({
  onUserSelect,
  selectedUserId,
  userId,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getUsers().then(data => {
      setUsers(data);
    });
  }, []);

  //selectedUserId  замість "Choose a user".
  const selectUserByDropdown = users.find(user => user.id === userId);

  // перевіряє чи клік був поза межами dropdown, і закриває його
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

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isOpen })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {selectUserByDropdown ? selectUserByDropdown.name : 'Choose a user'}
          </span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': selectedUserId === user.id,
                })}
                onClick={e => {
                  e.preventDefault();
                  onUserSelect(user.id);
                  setIsOpen(false);
                }}
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
