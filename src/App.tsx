import React, { useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setLoader={setLoader}
                  setSelectedUser={setSelectedUser}
                  setError={setError}
                  setLoadingPosts={setLoadingPosts}
                  setPosts={setPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && !error && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loader && <Loader />}

                {error && selectedUser && loadingPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {selectedUser && !loadingPosts && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {selectedUser && (
                  <PostsList
                    userId={selectedUser.id}
                    posts={posts}
                    setPosts={setPosts}
                    setLoadingPosts={setLoadingPosts}
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
