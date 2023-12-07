import React, { useContext } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { GlobalContext } from './GlobalContext';
import { NoPostWarning } from './components/NoPostWarning';

export const App: React.FC = () => {
  const {
    posts,
    selectedUser,
    selectedPost,
    isLoadingPosts,
    isLoadingError,
  } = useContext(GlobalContext);

  let postListRender;

  if (selectedUser) {
    if (!posts.length && !isLoadingError && !isLoadingPosts) {
      postListRender = <NoPostWarning />;
    }

    if (posts.length && !isLoadingError && !isLoadingPosts) {
      postListRender = <PostsList />;
    }
  }

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

                {isLoadingPosts && <Loader />}

                {!isLoadingPosts && isLoadingPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {postListRender}
              </div>
            </div>
          </div>

          {selectedPost && selectedPost.userId === selectedUser?.id && (
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
              <PostDetails />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
