import React, { useContext } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { UserContext } from './contexts/userContext';
import { PostContext } from './contexts/postContext';

export const App: React.FC = () => {
  const { activeUser, postsOfUser, loadingPostsError, isPostsLoaderOn } =
    useContext(UserContext);

  const { activePostId } = useContext(PostContext);

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
                {activeUser === 0 && !loadingPostsError && !isPostsLoaderOn && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsLoaderOn && <Loader />}

                {loadingPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {activeUser !== 0 && postsOfUser.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {activeUser !== 0 && postsOfUser.length !== 0 && (
                  <PostsList usersPosts={postsOfUser} />
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
              { 'Sidebar--open': activePostId !== 0 },
            )}
          >
            {activePostId !== 0 && (
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
