import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { CommentProvider } from './providers/CommentProvider';
import { useUsers } from './providers/UserProvider';
import { usePosts } from './providers/PostProvider';

export const App: React.FC = () => {
  const { selectedUser } = useUsers();
  const { selectedPost, isLoading, isError, posts } = usePosts();

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
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : isLoading ? (
                  <Loader />
                ) : isError ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                ) : !posts.length ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList />
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
              { 'Sidebar--open': !!selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <CommentProvider>
                {!!selectedPost && <PostDetails />}
              </CommentProvider>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
