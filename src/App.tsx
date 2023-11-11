import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useUserContext } from './components/Context/Context';

export const App: React.FC = () => {
  const {
    errorPosts,
    userSelected,
    posts,
    isLoadingPosts,
    postSelected,
  } = useUserContext();

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
                {!userSelected && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingPosts && (
                  <Loader />
                )}

                {errorPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorPosts}
                  </div>
                )}

                {(posts?.length === 0
                  && userSelected
                  && isLoadingPosts === false)
                  && (
                    // eslint-disable-next-line max-len
                    <div className="notification is-warning" data-cy="NoPostsYet">
                      No posts yet
                    </div>
                  )}

                <PostsList />
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
              {
                'Sidebar--open': postSelected,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
