import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import React, { useCallback, useEffect, useState } from 'react';
import { client } from './utils/fetchClient';
import { useUsers } from './components/UsersContext';
import { User } from './types/User';
import { useLocation } from 'react-router-dom';
import { Post } from './types/Post';

export const App = () => {
  const { users, setUsers } = useUsers();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const { hash } = useLocation();

  const findUserById = useCallback(
    (id: number) => {
      return users.find(user => user.id === id) || null;
    },
    [users],
  );

  const getPostByUser = (id: number) => {
    setLoading(true);

    return client.get(`/posts?userId=${id}`);
  };

  useEffect(() => {
    client.get('/users').then(d => setUsers?.(d as User[]));
  }, []);

  useEffect(() => {
    const res = hash.replace('#', '').trim();

    setSelectedUser(findUserById(+res));
  }, [hash, setSelectedUser, findUserById]);

  useEffect(() => {
    setError(false);
    setSelectedPost(null);

    if (!selectedUser) {
      return setPosts(null);
    }

    getPostByUser(selectedUser?.id)
      .then(res => setPosts(res as Post[] | null))
      .catch(err => {
        setError(err);
        setPosts(null);
      })
      .finally(() => setLoading(false));
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          {/* #region main */}
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector selectedUser={selectedUser} />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser && !loading && !error ? (
                  <PostsList
                    posts={posts}
                    onPostSelect={setSelectedPost}
                    selectedPost={selectedPost}
                  />
                ) : (
                  ''
                )}

                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* #endregion */}

          {/* #region onUserSelect */}
          {selectedPost && !error ? (
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
                <PostDetails post={selectedPost} />
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </main>
  );
};
