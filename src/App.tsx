/* eslint-disable func-names */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/bulma.sass';
import './App.scss';

import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { getPosts, getUsers } from './utils/api';
import { User, Post } from './types';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isListVisible = !isLoading && Boolean(posts.length);
  const isWarningVisible = !isLoading && user && !isListVisible;

  const setSelectedUser = useCallback(
    (selectedUser: User) => setUser(selectedUser),
    [],
  );

  const setSelectedPost = useCallback(
    (newPost: Post | null) => setPost(newPost),
    [],
  );

  useEffect(() => {
    (async function () {
      try {
        setUsers(await getUsers());
      } catch {
        setHasError(true);
      }
    }());
  }, []);

  useEffect(() => {
    (async function () {
      try {
        setPosts(await getPosts(user?.id || 0));
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }());
  }, [user]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={user}
                  setSelectedUser={setSelectedUser}
                  setIsLoading={setIsLoading}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">
                  {!user && 'No user selected'}
                </p>

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isWarningVisible && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {isLoading && <Loader />}

                {isListVisible && (
                  <PostsList
                    posts={posts}
                    selectedPostId={post?.id || 0}
                    setSelectedPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': post },
            )}
          >
            {post && (
              <div className="tile is-child box is-success ">
                <PostDetails selectedPost={post} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
