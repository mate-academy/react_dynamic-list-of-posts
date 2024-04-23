import React, { useContext } from 'react';
import classNames from 'classnames';
import { PostsList } from './PostsList';
import { PostDetails } from './PostDetails';
import { UserSelector } from './UserSelector';
import { Loader } from '../components/Loader';
import { PostsAppContext } from './AppContext';
import { ErrorType } from './AppContext';

export const PostsApp = () => {
  const { selectedUser, isLoadingPosts, errorType, userPosts, selectedPost } =
    useContext(PostsAppContext);

  const noPostCheck =
    selectedUser &&
    !userPosts.length &&
    !isLoadingPosts &&
    errorType === ErrorType.noError;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {errorType === ErrorType.loadingPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostCheck && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && !!userPosts.length && !isLoadingPosts && (
                  <PostsList />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
