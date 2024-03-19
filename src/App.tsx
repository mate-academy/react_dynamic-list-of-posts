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
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => setError('Something went wrong!'));
  }, []);

  useEffect(() => {
    if (selectedUser !== 0) {
      setLoading(true);
      setError('');

      client
        .get<Post[]>(`/posts?userId=${selectedUser}`)
        .then(setUserPosts)
        .catch(() => setError('Something went wrong!'))
        .finally(() => setLoading(false));
    }

    setSelectedPost(null);
  }, [selectedUser, setLoading]);

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
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {!loading && !!selectedUser && !userPosts.length && !error && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!loading && !!selectedUser && !error && (
                  <PostsList
                    posts={userPosts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': !!selectedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {!!selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
