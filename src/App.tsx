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
import { getPost, getPosts } from './api/posts';
import {
  ErrorsNotification,
} from './components/ErrorsNotification/ErrorsNotification';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadPosts = (userId: number) => {
    setIsLoading(true);

    getPosts(userId)
      .then(data => {
        setPosts(data);
      })
      .catch(() => {
        setError('Unable to load posts');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadPost = (postId: number) => {
    getPost(postId)
      .then(data => {
        setSelectedPost(data);
      })
      .catch(() => {
        setError('Post detail can\'t be loaded');
      });
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedId={selectedUser?.id || null}
                  setSelectedUser={setSelectedUser}
                  loadPosts={loadPosts}
                  setIsLoading={setIsLoading}
                  setError={setError}
                  selectedUser={selectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && (
                  <Loader />
                )}

                {error && (
                  <ErrorsNotification
                    error={error}
                    setError={setError}
                  />
                )}

                {selectedUser && !posts?.length && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {!!posts?.length && (
                  <PostsList
                    posts={posts}
                    loadPost={loadPost}
                    setSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
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
              'Sidebar', {
                'Sidebar--open': !!selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
