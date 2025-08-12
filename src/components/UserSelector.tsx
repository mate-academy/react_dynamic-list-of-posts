import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  loadUserPosts: (user: User) => void;
  activeUser: User | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  loadUserPosts,
  activeUser,
  setSelectedPost,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  function onBlur() {
    setIsActive(false);
  }

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setIsActive(prev => !prev);
          }}
          onBlur={() => setTimeout(onBlur, 200)}
        >
          {activeUser ? (
            <span>{activeUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

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
              className={classNames('dropdown-item', {
                'is-active': activeUser === user,
              })}
              key={user.id}
              onClick={() => {
                setSelectedPost(null);
                loadUserPosts(user);
                setIsActive(false);
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
