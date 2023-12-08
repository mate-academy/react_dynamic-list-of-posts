import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { AppContext } from '../appContext';
import { getPosts, getUsers } from '../utils/api';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const context = useContext(AppContext);

  const {
    users,
    setUsers,
    isDropdown,
    setIsDropdown,
    selectedUser,
    setSelectedUser,
    setPosts,
    setSelectedPost,
    setIsError,
    setIsLoader,
  } = context;

  useEffect(() => {
    getUsers()
      .then(user => setUsers(user));
  }, [setUsers]);

  const handleSelected = (user: User) => {
    setSelectedPost(null);
    setIsLoader(true);
    setIsDropdown(false);
    setSelectedUser(user);

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
          onClick={() => setIsDropdown(!isDropdown)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropdown && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                onClick={() => handleSelected(user)}
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
