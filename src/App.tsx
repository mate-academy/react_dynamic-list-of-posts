import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const fetchUsers = () => {
    setErrorMessage('');

    client.get<User[]>('/users').then((data) => {
      setUsers(data);
    }).catch(() => {
      setErrorMessage('Something went wrong!');
    });
  };

  const fetchPosts = () => {
    if (!selectedUser) {
      return;
    }

    setErrorMessage('');
    setLoading(true);
    setSelectedPost(null);

    client.get<Post[]>(`/posts?userId=${selectedUser?.id}`).then((data) => {
      setPosts(data);
    }).catch(() => {
      setErrorMessage('Something went wrong!');
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(fetchUsers, []);
  useEffect(fetchPosts, [selectedUser, selectedUser?.id]);

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

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loading && selectedUser && (<Loader />)}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {selectedUser
                  && !posts.length
                  && !loading
                  && !errorMessage
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {posts.length && !loading && !errorMessage && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    selectPost={setSelectedPost}
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
              { 'Sidebar--open': !!selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
};
