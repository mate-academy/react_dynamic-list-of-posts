import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './api/api';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPostsError, setHasPostsError] = useState(false);
  const [hasUsersError, setHasUsersError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setHasUsersError(true));
  }, []);

  console.log(hasPostsError);

  const noPostsWarn = selectedUser && !posts.length
    && !isLoading && !hasPostsError;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  setPosts={setPosts}
                  setIsLoading={setIsLoading}
                  setHasPostsError={setHasPostsError}
                />
              </div>

              <div className="block" data-cy="MainContent">

                {isLoading && <Loader />}

                {!selectedUser && !hasUsersError && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {hasUsersError && (
                  <div
                    className="notification is-danger"
                  >
                    Unable to load users!
                  </div>
                )}

                {hasPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostsWarn && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                  />
                )}
              </div>
            </div>
          </div>

          {false && (
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
              <div className="tile is-child box is-success ">
                <PostDetails />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
