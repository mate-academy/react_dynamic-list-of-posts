import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { SetUserContext, UserContext } from '../context/UserContext';

export const UserSelector: React.FC = () => {
  const selectedUser = useContext(UserContext);
  const setSelectedUser = useContext(SetUserContext);
  const [users, setUsers] = useState<User[]>([]);
  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdown(false);
    }
  };

  const handleOnSelectUser = (user: User) => {
    setSelectedUser(user);
    setDropdown(false);
  };

  useEffect(() => {
    getUsers().then(setUsers);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setDropdown]);

  const handleOnClick = () => {
    setDropdown(!dropdown);
  };

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': dropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOnClick}
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
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => handleOnSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
