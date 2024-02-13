import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type Props = {
  onUserSelect: (user: User) => void,
  selectedUser: User | null,
};

export const UserSelector: React.FC<Props> = ({
  onUserSelect,
  selectedUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleUserSelect = (user: User) => {
    onUserSelect(user);
    setIsDropdownOpen(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div
      onBlur={handleBlur}
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropdownOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
              href={`#${user.id}`}
              onClick={() => handleUserSelect(user)}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
