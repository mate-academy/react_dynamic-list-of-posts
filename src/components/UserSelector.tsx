import React, { useContext, useEffect, useRef, useState } from 'react';
import { getUsers } from '../api/users';
import { AppContext } from '../context/context';
import classNames from 'classnames';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const [dropdown, setDropdown] = useState(false);

  const { users, setUsers, setSelectedUser, selectedUser, setSelectedPost } =
    useContext(AppContext);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    getUsers().then(setUsers);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setUsers]);

  const handleOnClick = () => {
    setDropdown(!dropdown);
  };

  const handleOnSelectUser = (user: User) => {
    setSelectedPost(null);
    setSelectedUser(user);
    setDropdown(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': dropdown })}
      ref={dropdownRef}
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
          {dropdown}
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users &&
            users.map(user => (
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
