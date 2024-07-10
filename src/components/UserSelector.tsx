import { memo, useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { UsersContext } from '../store/UsersContext';
import { PostsContext } from '../store/PostsContext';
import { User } from '../types/User';

export const UserSelector = memo(function UserSelectorComponent() {
  const { users, selectedUser, setSelectedUser } = useContext(UsersContext);
  const { loadPosts, selectedPost, setSelectedPost } = useContext(PostsContext);

  const [isFocused, setIsFocused] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const selectUser = (newUser: User) => () => {
    setIsFocused(false);

    if (selectedUser?.id === newUser.id) {
      return;
    }

    if (selectedPost) {
      setSelectedPost(null);
    }

    setSelectedUser(newUser);
    setIsFocused(false);
    loadPosts(newUser.id);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropRef.current && !dropRef.current.contains(event.target as Node)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isFocused,
      })}
      ref={dropRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsFocused(!isFocused)}
        >
          <span>
            {selectedUser?.name ? selectedUser.name : 'Choose a user'}
          </span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              onClick={selectUser(user)}
              key={user.id}
              href={`#user${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});
