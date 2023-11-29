import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { GlobalContext } from './GeneralContext';
import { User } from '../types/User';
import { getPosts } from '../api/posts';
import { ErrorType } from '../types/ErrorType';

export const UserSelector: React.FC = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    setIsPostsLoading,
    setPosts,
    setError,
    setSelectedPost,
  } = useContext(GlobalContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    return isDropdownOpen
      ? setIsDropdownOpen(false)
      : setIsDropdownOpen(true);
  };

  const handleSetUser = (user: User) => {
    setError(ErrorType.none);
    setSelectedPost(null);
    setIsPostsLoading(true);
    setSelectedUser(user);
    setIsDropdownOpen(false);
    getPosts(user.id).then(setPosts)
      .catch((err) => {
        setError(ErrorType.postsLoadingError);
        throw err;
      })
      .finally(() => setIsPostsLoading(false));
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown', {
          'is-active': isDropdownOpen,
        },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          <span>{!selectedUser ? 'Choose a user' : selectedUser.name}</span>

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
              className={classNames(
                'dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                },
              )}
              onClick={() => handleSetUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
