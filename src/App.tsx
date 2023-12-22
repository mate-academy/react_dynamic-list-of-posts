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
import { Post } from './types/Post';
import { getPosts, getUsers } from './api/posts';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [visibleForm, setVisibleForm] = useState(false);

  useEffect(() => {
    getUsers()
      .then(usersFromApi => setUsers(usersFromApi));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      setError(false);

      getPosts(selectedUser.id)
        .then(postsUser => setPosts(postsUser))
        .catch(() => setError(true))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  const conditionForNoPostsYet = !isLoading && !error
    && !posts?.length && selectedUser;

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
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {!isLoading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {conditionForNoPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts?.length && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setVisibleForm={setVisibleForm}
                  />
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  visibleForm={visibleForm}
                  setVisibleForm={setVisibleForm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
