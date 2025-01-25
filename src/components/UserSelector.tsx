import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useClickOutside } from '../hooks/useClickOutside';

interface Props {
  users: User[];
  onSelectUser: (user: User) => void;
  selectedUser: User | null;
}

export const UserSelector: React.FC<Props> = ({
  users,
  onSelectUser,
  selectedUser,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const handleDropdownToggle = () => {
    setIsDropdownOpen(open => !open);
  };

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className="dropdown is-active"
      onClick={handleDropdownToggle}
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

      {isDropdownOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                onClick={() => onSelectUser(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
