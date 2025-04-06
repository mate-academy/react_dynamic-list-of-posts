import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[] | undefined;
  onUserId: (value: number) => void;
};

export const UserSelector: React.FC<Props> = ({ users, onUserId }) => {
  const [dropdown, setDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdown = () => {
    setDropdown(prev => !prev);
  };

  const handleGetUser = (user: User) => {
    onUserId(user.id);
    setSelectedUser(user);
    setDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', dropdown ? 'is-active' : '')}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdown}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users?.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                user === selectedUser && 'is-active',
              )}
              onClick={() => handleGetUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
