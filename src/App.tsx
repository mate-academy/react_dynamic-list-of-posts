import React, { useContext } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { InitialContext } from './components/ToDoContext';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const {
    selectedUser,
    selectedPost,
    users,
    error,
    errorNotification,
    loadingPosts,
    posts,
  } = useContext(InitialContext);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} />
              </div>
              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingPosts && <Loader />}

                {error && posts.length < 1 && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorNotification}
                  </div>
                )}

                {selectedUser && posts.length === 0 && !loadingPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && posts.length !== 0 && !loadingPosts && (
                  <PostsList />
                )}
              </div>
            </div>
          </div>
          {selectedUser && posts.length > 0 && (
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
              {selectedPost && selectedUser.id === selectedPost.userId && (
                <div className="tile is-child box is-success ">
                  <PostDetails />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
