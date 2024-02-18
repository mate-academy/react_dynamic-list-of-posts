import React, { useContext } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { StateContext } from './management/StateContext';

export const App: React.FC = () => {
  const {
    currentUser,
    errorGetPosts,
    posts,
    isLoaderPosts,
    openCommentsButton,
  } = useContext(StateContext);

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
                {!currentUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoaderPosts && <Loader />}

                {errorGetPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!posts.length
                  && currentUser
                  && !isLoaderPosts
                  && !errorGetPosts
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {!!posts.length
                  && !isLoaderPosts
                  && !errorGetPosts && <PostsList />}
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
              { 'Sidebar--open': openCommentsButton && !!posts.length },
            )}
          >

            <div className="tile is-child box is-success ">
              {openCommentsButton && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
