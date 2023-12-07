import React, { useContext } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { GlobalContext } from './GlobalContetxt';

export const AppPosts: React.FC = () => {
  const {
    userId,
    posts,
    isLoadingPosts,
    isVisibleError,
    postId,
  } = useContext(GlobalContext);

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
                {!userId && !isVisibleError && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingPosts && (
                  <Loader />
                )}

                {isVisibleError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!!userId
                && !posts.length
                && !isLoadingPosts
                && !isVisibleError
                && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!userId && !!posts.length && !isLoadingPosts && (
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
              { 'Sidebar--open': !!postId },
            )}
          >
            <div className="tile is-child box is-success ">
              {!!postId && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
