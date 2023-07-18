/* eslint-disable max-len */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/bulma.sass';
import React from 'react';
import './App.scss';

import classNames from 'classnames';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { usePostsContext } from './hooks/usePostsContext';
import { useUserContext } from './hooks/useUserContext';

export const App: React.FC = () => {
  const {
    posts,
    isPostsError,
    isPostsPending,
    selectedPost,
  } = usePostsContext();
  const { selectedUser } = useUserContext();

  const hasError = !isPostsPending && isPostsError;
  const withoutErrors = selectedUser && !isPostsError;
  const fetchedWithoutErrors = withoutErrors && !isPostsPending;

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
                    No user selected
                  </p>
                )}
                {withoutErrors && isPostsPending && (<Loader />)}
                {fetchedWithoutErrors && (posts.length > 0
                  ? <PostsList />
                  : (
                    <div className="notification is-warning" data-cy="NoPostsYet">
                      No posts yet
                    </div>
                  )
                )}
                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
