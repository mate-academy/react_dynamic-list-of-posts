import React, { useState } from 'react';
import classNames from 'classnames';
import { usePostInfo } from '../utils/PostContext';
import { User } from '../types/User';
import * as postServices from '../api/posts';

export const UserSelector: React.FC = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    setPosts,
    setSelectedPost,
    setErrPostLoading,
    setIsPostLoading,
  } = usePostInfo();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsDropdownOpen(false);
    setErrPostLoading(false);
    setSelectedPost(null);
    setIsPostLoading(true);

    postServices
      .getPosts(user.id)
      .then(setPosts)
      .catch(error => {
        setErrPostLoading(error);
      })
      .finally(() => setIsPostLoading(false));
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onBlur={() => setIsDropdownOpen(false)}
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
              onMouseDown={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
