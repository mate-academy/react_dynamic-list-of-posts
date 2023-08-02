import React, { useContext, useState } from 'react';
import classNames from 'classnames';

import { PostsContext } from '../PostsContext';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const {
    allUsers,
    selectedUser,
    setSelectedUser,
    setSelectedPost,
  } = useContext(PostsContext);

  const dropdownRef = useOutsideClick(() => {
    setIsDropdownShown(false);
  });

  const toggleDropdown = () => {
    setIsDropdownShown(prevIsShown => !prevIsShown);
  };

  const handleSelect = (user: User): void => {
    setSelectedUser(user);
    setIsDropdownShown(false);
    setSelectedPost(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownShown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
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
          {allUsers.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => handleSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
