import React, { useContext } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { StateContext } from './context/GlobalPostsProvider';

export const App: React.FC = () => {
  const {
    user, posts, isPostsLoading,
    postsFetchError, isOpenPostBody
  } = useContext(StateContext);
    console.log("🚀 ~ isPostsLoading:", isPostsLoading)

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

            {isPostsLoading && <Loader />}

            {!isPostsLoading && posts && user && (
              <PostsList />
            )}

            {!isPostsLoading && posts && user && posts.length === 0 && (
              <div
                className="notification is-warning"
                data-cy="NoPostsYet"
              >
                No posts yet
              </div>
            )}

            {postsFetchError && (
              <div
              className="notification is-danger"
              data-cy="PostsLoadingError"
              >
                Something went wrong!
              </div>
            )}

            {!isPostsLoading && !user && (
              <p data-cy="NoSelectedUser">No user selected</p>
            )}

          </div>
        </div>
      </div>

          {isOpenPostBody && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                { 'Sidebar--open': isOpenPostBody },
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
