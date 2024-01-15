import React, { useEffect, useContext } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { TodosContext } from '../TodoContext';
import { getUsers, getPosts } from '../utils/api';

export const UserSelector: React.FC = () => {
  const context = useContext(TodosContext);
  const {
    users,
    setUsers,
    isDropdownActive,
    setIsDropdownActive,
    selectedUser,
    setSelectedUser,
    setPosts,
    setIsLoader,
    setSelectedPost,
    setIsError,
  } = context;

  useEffect(() => {
    getUsers()
      .then(user => setUsers(user));
  }, [setUsers]);

  const handleDropdown = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsDropdownActive(false);
    setIsLoader(true);
    setSelectedPost(null);

    getPosts(user.id)
      .then(post => setPosts(post))
      .catch(() => setIsError(true))
      .finally(() => setIsLoader(false));
  };

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
          onClick={handleDropdown}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropdownActive && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={cn(
                  'dropdown-item',
                  {
                    'is-active': selectedUser?.id === user.id,
                  },
                )}
                onClick={() => handleUserSelect(user)}
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
