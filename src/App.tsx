import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsersPosts } from './api';
import { User } from './types/User';
import { Post } from './types/Post';
import { Notification } from './components/Notification';
import { Sidebar } from './components/Sidebar';
import { Error } from './types/Error';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [usersAreLoaded, setUsersAreLoaded] = useState(false);
  const [postsAreLoaded, setPostsAreLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadUserPosts = async (userId: number) => {
    setIsLoading(true);

    try {
      const response = await getUsersPosts(userId);

      setPostsAreLoaded(true);

      setPosts(response);
    } catch {
      const newError = {
        message: 'Unable to load users posts',
        type: 'PostsLoadingError',
        isDanger: true,
      };

      setError(newError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]);

    if (selectedUser) {
      loadUserPosts(selectedUser.id);
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                  setError={setError}
                  setUsersAreLoaded={setUsersAreLoaded}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {(!selectedUser && usersAreLoaded) && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {(postsAreLoaded && !isLoading) && (
                  <PostsList
                    posts={posts}
                    setSelectedPost={setSelectedPost}
                    selectedPostId={selectedPost?.id}
                  />
                )}

                {isLoading && <Loader />}

                {error && (
                  <Notification
                    error={error}
                    setError={setError}
                  />
                )}
              </div>
            </div>
          </div>

          <Sidebar selectedPost={selectedPost} />
        </div>
      </div>
    </main>
  );
};
