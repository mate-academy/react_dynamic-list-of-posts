import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { getPostsByUserId } from '../api/posts';
import { ErrorMessage } from '../types/ErrorMessage';

interface Props {
  selectedUser: User | null,
  onSelectUser: React.Dispatch<React.SetStateAction<User | null>>,
  users: User[],
  onSetPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  onSetErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessage | null>>,
  onSetPostLoader: React.Dispatch<React.SetStateAction<boolean>>,
  onSelectPost: React.Dispatch<React.SetStateAction<Post | null>>,
}

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  onSelectUser,
  users,
  onSetPosts,
  onSetErrorMessage,
  onSetPostLoader,
  onSelectPost,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const handleToggleDropdown = () => {
    setIsDropdownActive(prevState => !prevState);
  };

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
    onSetPostLoader(true);
    onSetErrorMessage(null);
    onSelectPost(null);
    getPostsByUserId(user.id)
      .then(response => {
        onSetPosts(response);
      })
      .catch(() => {
        onSetErrorMessage(ErrorMessage.GET_POSTS_ERROR);
        onSetPosts([]);
      })
      .finally(() => {
        onSetPostLoader(false);
      });
    handleToggleDropdown();
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggleDropdown}
        >
          <span>
            {selectedUser
              ? selectedUser.name
              : 'Choose a user'}
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
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              key={user.id}
              onClick={() => {
                handleSelectUser(user);
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
