import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';

import { Post } from './types/Post';
import { User } from './types/User';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setError('Something went wrong!');
        setTimeout(() => setError(''), 3000);
      });
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setLoading(true);
    setPosts([]);
    setSelectedPost(null);

    getUserPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, [selectedUser]);

  useEffect(() => {
    setSelectedPost(selectedPost);
  }, [selectedPost]);

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
                  onSelect={setSelectedUser}
                />
              </div>

              {!selectedUser && (
                <p data-cy="NoSelectedUser">No user selected</p>
              )}

              <div className="block" data-cy="MainContent">
                {loading && <Loader />}

                {error && !loading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {!posts.length && selectedUser && !loading && !error && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts.length && selectedUser && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelect={setSelectedPost}
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
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
