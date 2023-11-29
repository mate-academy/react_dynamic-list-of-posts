import React, { useContext } from 'react';
import classNames from 'classnames';
import { GlobalContext } from './GeneralContext';
import { PostsList } from './PostsList';
import { PostDetails } from './PostDetails';
import { UserSelector } from './UserSelector';
import { Loader } from './Loader';
import { ErrorType } from '../types/ErrorType';

export const MainContent: React.FC = () => {
  const {
    selectedUser,
    isPostsLoading,
    posts,
    error,
    selectedPost,
  } = useContext(GlobalContext);

  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <div className="tile is-child box is-success">
          <div className="block">
            <UserSelector />
          </div>

          <div className="block" data-cy="MainContent">
            {!selectedUser && (
              <p data-cy="NoSelectedUser">
                No user selected
              </p>
            )}

            {isPostsLoading && <Loader />}

            {error === ErrorType.postsLoadingError && (
              <div
                className="notification is-danger"
                data-cy="PostsLoadingError"
              >
                Something went wrong!
              </div>
            )}

            {selectedUser
            && !isPostsLoading
            && error === ErrorType.none
            && (posts.length > 0
              ? <PostsList />
              : (
                <div className="notification is-warning" data-cy="NoPostsYet">
                  No posts yet
                </div>
              ))}
          </div>
        </div>
      </div>

      <div
        data-cy="Sidebar"
        className={classNames(
          'tile',
          'is-parent',
          'is-8-desktop',
          'Sidebar', {
            'Sidebar--open': selectedPost,
          },
        )}
      >
        <div className="tile is-child box is-success ">
          <PostDetails />
        </div>
      </div>
    </div>
  );
};
