import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { PostsContext } from '../postsContext';

export const UserSelector: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const { selectedUser, setSelectedUser, users, setSelectedPost, setPosts } =
    useContext(PostsContext);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': opened })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setOpened(!opened)}
          onBlur={() => setOpened(false)}
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
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onMouseDown={() => {
                setSelectedUser(user);
                setPosts([]);
                setSelectedPost(null);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
