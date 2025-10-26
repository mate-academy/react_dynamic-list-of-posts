/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useEffect, useState } from 'react';
import { client } from './utils/fetchClient';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [, setUsersError] = useState<string | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // — id вибраного користувача
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setIsUsersLoading(true);
      setUsersError(null);

      try {
        const loadedUsers = await client.get<User[]>('/users');

        setUsers(loadedUsers);
      } catch (err) {
        setUsersError('Failed to load users');
      } finally {
        setIsUsersLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId === null) {
      setPosts([]);

      return;
    }

    const loadPosts = async () => {
      setIsPostsLoading(true);
      setPostsError(null);
      setPosts([]);

      try {
        const loadedPosts = await client.get<Post[]>(
          `/posts?userId=${selectedUserId}`
        );

        setPosts(loadedPosts);
      } catch (error) {
        setPostsError('Something went wrong!');
      } finally {
        setIsPostsLoading(false);
      }
    };

    loadPosts();
  }, [selectedUserId]);

  const handleUserSelect = (userId: number | null) => {
    setSelectedUserId(userId);
    setSelectedPost(null);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {isUsersLoading && <Loader />}

                <UserSelector
                  users={users}
                  onSelect={handleUserSelect}
                  selectedId={selectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {selectedUserId !== null && isPostsLoading && <Loader />}
                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsError}
                  </div>
                )}
                {!isPostsLoading &&
                  !postsError &&
                  selectedUserId !== null &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {posts.length > 0 && (
                  <PostsList posts={posts} onSelectPost={setSelectedPost} />
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
              { 'Sidebar--open': selectedPost !== null }
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost ? (
                <PostDetails
                  post={selectedPost}
                  selectedUserId={selectedUserId}
                />
              ) : (
                <p>Select a post to see details</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
