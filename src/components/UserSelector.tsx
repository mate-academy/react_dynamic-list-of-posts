import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { usePosts } from './PostContext';
import * as userService from '../services/user';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const {
    users, setUsers, selectedUser, setSelectedUser,
  } = usePosts();
  const [isListVisible, setIsListVisible] = useState(false);

  const loadUsers = () => {
    return userService.getUsers()
      .then((usersFromAPI) => {
        setUsers(usersFromAPI);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const handleClick = () => {
    setIsListVisible(!isListVisible);
  };

  const handleSelect = (user: User) => {
    setSelectedUser(user);
    setIsListVisible(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleClick}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {isListVisible && (
          <div className="dropdown-content">
            {users.map(user => (
              <a
                onClick={() => handleSelect(user)}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser && selectedUser.id === user.id,
                })}
              >
                {user.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
