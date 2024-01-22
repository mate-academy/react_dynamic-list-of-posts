import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../api/users';

interface Props {
  selectedUser: User | null;
  setSelectedUser: (newUser: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(err => {
        throw err;
      });
  }, []);

  const hideDropdown = useCallback(() => {
    setIsDropdownActive(false);
  }, [setIsDropdownActive]);

  const toggleDropdownStatus = useCallback(() => {
    setIsDropdownActive(isActive => !isActive);
  }, [setIsDropdownActive]);

  const onSelectorBlur = useCallback(() => setTimeout(() => {
    if (isDropdownActive) {
      hideDropdown();
    }
  }, 150), [isDropdownActive, hideDropdown]);

  const handleSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
    hideDropdown();
  }, [setSelectedUser, hideDropdown]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownActive,
      })}
      onBlur={onSelectorBlur}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdownStatus}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
