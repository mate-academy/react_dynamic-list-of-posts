import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { usePostContext } from './context/PostProvider';

export const App: React.FC = () => {
  const
    {
      person, posts, postsLoading, error, selectedPost,
    } = usePostContext();

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
                {!person && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {postsLoading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!postsLoading && !posts.length && person && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) }

                {!!posts.length && <PostsList /> }
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
              'Sidebar--open',
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
