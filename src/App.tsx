import React, { useContext } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { StateContext } from './store/store';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const {
    selectedUser,
    isLoading,
    posts,
    isWarming,
    isLoadingFail,
    currentPost,
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
                {selectedUser ? (
                  ''
                ) : (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {isLoadingFail && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!!posts?.length && <PostsList />}
                {isWarming && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
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
              { 'Sidebar--open': currentPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
