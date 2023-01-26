/* eslint-disable func-names */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/bulma.sass';
import './App.scss';

import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Post, User } from './types';
import { getPosts, getUsers } from './utils/api';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const setSelectedUser = useCallback(
    (selectedUser: User) => setUser(selectedUser),
    [],
  );

  const setSelectedPost = useCallback(
    (newPost: Post | null) => setPost(newPost),
    [],
  );

  const toggleIsLoading = useCallback(
    (param: boolean) => setIsLoadingComments(param),
    [],
  );

  const toggleFormOpen = useCallback(
    (param: boolean) => setIsFormOpen(param),
    [],
  );

  const closePost = useCallback(() => setPost(null), []);
  const startLoading = useCallback(() => setIsLoading(true), []);

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
                  startLoading={startLoading}
                  closePost={closePost}
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

                {isLoading
                  ? <Loader />
                  : ((
                    user && (
                      (posts.length === 0 && (
                        <div
                          className="notification is-warning"
                          data-cy="NoPostsYet"
                        >
                          No posts yet
                        </div>
                      ))
                    || (
                      posts.length > 0 && (
                        <PostsList
                          posts={posts}
                          selectedPostId={post?.id as number}
                          setSelectedPost={setSelectedPost}
                          setIsFormOpen={toggleFormOpen}
                          setLoading={toggleIsLoading}
                        />
                      )
                    ))
                  ))}
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
                <PostDetails
                  selectedPost={post}
                  isFormOpen={isFormOpen}
                  setIsFormOpen={toggleFormOpen}
                  setIsLoading={toggleIsLoading}
                  isLoading={isLoadingComments}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
