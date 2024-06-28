/* eslint-disable @typescript-eslint/indent */
import React, { useContext } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { AppContext } from './context/AppContext';
import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';

export const App: React.FC = () => {
  const { state } = useContext(AppContext);
  const { selectedUser, errors, userPosts, selectedPost, sidebar } = state;
  const { isLoading } = selectedUser;

  const loadingPostError = errors.find(
    error => error.type === 'PostsLoadingError' && error.errorValue,
  );

  // #region conditions
  const noPostsNotification =
    !isLoading && !loadingPostError && selectedUser.user && !userPosts.length;

  const showPostList =
    !isLoading && selectedUser.user && !!userPosts.length && !loadingPostError;
  // #endregion

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
                {!selectedUser.user && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoading && <Loader />}
                {loadingPostError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {loadingPostError.errorText}
                  </div>
                )}
                {noPostsNotification && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {showPostList && <PostsList />}
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
              { 'Sidebar--open': selectedPost?.post && sidebar },
            )}
          >
            <div className="tile is-child box is-success ">
              {sidebar && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
