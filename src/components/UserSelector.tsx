import React, { useState } from 'react';
import { usePostContext } from '../utils/PostContext';
import classNames from 'classnames';
import { User } from '../types/User';
import { getPosts } from './api/posts';

export const UserSelector: React.FC = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    setPosts,
    setIsPostLoading,
    setSelectedPost,
    setIsPostLoadingError,
    setIsSidebarOpen,
  } = usePostContext();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleSelectedUser = (user: User) => {
    setPosts([]);
    setSelectedUser(user);
    setIsDropDownOpen(false);
    setIsPostLoadingError(false);
    setIsSidebarOpen(false);
    setSelectedPost(null);
    setIsPostLoading(true);

    getPosts(user.id)
      .then(setPosts)
      .catch(() => {
        setIsPostLoadingError(true);
      })
      .finally(() => setIsPostLoading(false));
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropDownOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          onBlur={() => setIsDropDownOpen(false)}
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
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onMouseDown={() => handleSelectedUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
