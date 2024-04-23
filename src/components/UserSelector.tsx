import React, { useContext, useState } from 'react';
import { PostsAppContext } from './AppContext';
import { User } from '../types/User';
import classNames from 'classnames';
import { getUserPosts } from '../utils/apiHandler';
import { ErrorType } from './AppContext';

export const UserSelector: React.FC = () => {
  const [isUsersListVisible, setIsUserListVisible] = useState(false);
  const {
    usersList,
    selectedUser,
    setSelectedUser,
    setIsLoadingPosts: setIsLoading,
    setUserPosts,
    setErrorType,
    setSelectedPost,
  } = useContext(PostsAppContext);

  const getPosts = (id: number) => {
    getUserPosts(id)
      .then(posts => setUserPosts(posts))
      .catch(() => {
        setUserPosts([]);
        setErrorType(ErrorType.loadingPosts);
      })
      .finally(() => setIsLoading(false));
  };

  const handleUsersListVisibility = () => {
    setIsUserListVisible(!isUsersListVisible);
  };

  const handleUserSelect = (id: number) => {
    setSelectedPost(null);
    setErrorType(ErrorType.noError);

    const targetUser = usersList.find(user => user.id === id);

    if (targetUser) {
      setSelectedUser(targetUser);
      setIsLoading(true);
      getPosts(id);
    } else {
      setSelectedUser(null);
    }

    handleUsersListVisibility();
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isUsersListVisible })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleUsersListVisibility}
          onBlur={() => setTimeout(() => setIsUserListVisible(false), 200)}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
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
          {usersList.map((user: User) => {
            return (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                key={user.id}
                onClick={() => handleUserSelect(user.id)}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
