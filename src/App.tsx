import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useUsersContext } from './context/UsersContext';
import { usePostsContext } from './context/PostsContext';

export const App: React.FC = () => {
  const { activeUserId } = useUsersContext();
  const { postsLoading, postsError, posts, activePost } = usePostsContext();

  const errorContent = postsError && (
    <div className="notification is-danger" data-cy="PostsLoadingError">
      Something went wrong!
    </div>
  );
  const noPostsContent = !(
    postsLoading ||
    postsError ||
    posts.length ||
    !activeUserId
  ) && (
    <div className="notification is-warning" data-cy="NoPostsYet">
      No posts yet
    </div>
  );
  const postsContent = !(postsLoading || postsError || !posts.length) && (
    <PostsList />
  );

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
                {!activeUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {postsLoading && <Loader />}
                {errorContent}
                {noPostsContent}
                {postsContent}
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
                'Sidebar--open': activePost,
              },
            )}
          >
            {activePost && (
              <div className="tile is-child box is-success ">
                <PostDetails activePost={activePost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
