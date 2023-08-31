import React, { useState } from 'react';
import cn from 'classnames';
import { Store } from '../store';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    setPosts,
    setIsPostsLoading,
    setShowSidebar,
  } = Store();
  const [isDropdown, setIsDropdown] = useState(false);

  const selectHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => {
    e.preventDefault();
    setSelectedUser(user);
    setIsDropdown(!isDropdown);
    setIsPostsLoading(true);
    setShowSidebar(-1);
    client
      .get(`/posts?userId=${user.id}`)
      .then((res) => {
        if (Array.isArray(res) && res.length) {
          setPosts(res);
        } else {
          setPosts([]);
        }
      })
      .catch()
      .finally(() => setIsPostsLoading(false));
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdown(!isDropdown)}
        >
          <span>{selectedUser.name ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => (
            <a
              href={`user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser.id,
              })}
              key={user.id}
              onClick={(event) => selectHandler(event, user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
