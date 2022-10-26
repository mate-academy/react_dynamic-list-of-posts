import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';
import { NoPostsNotification } from './components/NoPostsNotification';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadUsers = useCallback(async () => {
    setError(false);

    try {
      const response = await getUsers();

      setUsers(response);
    } catch {
      setError(true);
    }
  }, []);

  const loadPosts = useCallback(async () => {
    setIsLoading(false);

    if (!selectedUser) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await getPosts(selectedUser.id);

      setPosts(response);
    } catch {
      setError(true);
    }

    setIsLoading(false);
  }, [selectedUser]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setSelectedPost(null);
    loadPosts();
  }, [selectedUser]);

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
                  onUserSelect={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!isLoading && !selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isLoading
                  && posts.length > 0
                  && selectedUser
                  && (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      onPostSelect={setSelectedPost}
                    />
                  )}
                {!isLoading
                  && selectedUser !== null
                  && posts.length === 0
                  && <NoPostsNotification />}
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
              <PostDetails
                post={selectedPost}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
