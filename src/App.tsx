import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { usePosts } from './context/PostContext';
import { Errors } from './types/Errors';

export const App: React.FC = () => {
  const {
    userPosts,
    loadingList,
    errorMessage,
    selectedUser,
    selectedPostId,
  } = usePosts();

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
                  <p data-cy="NoSelectedUser">
                    {Errors.NoSelectedUser}
                  </p>
                )}

                {loadingList && (
                  <Loader />
                )}

                {!loadingList && errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {Errors.SomethingWrong}
                  </div>
                )}

                {(!loadingList
                && !errorMessage
                && !userPosts.length
                && selectedUser !== null) && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    {Errors.NoPostsYet}
                  </div>
                )}

                {!loadingList && !!userPosts.length && (
                  <PostsList />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPostId },
            )}
          >
            {selectedPostId && (
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
