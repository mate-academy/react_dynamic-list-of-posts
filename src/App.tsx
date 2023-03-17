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
import { getUsers } from './api/users';
import { Post } from './types/Post';
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadUsers = async () => {
    try {
      const loadedUsers = await getUsers();

      setUsers(loadedUsers);
    } catch {
      setHasError(true);
    }
  };

  const loadPosts = async () => {
    setIsLoaded(true);
    try {
      const loadedPosts = await getPosts(selectedUserId);

      setPosts(loadedPosts);
    } catch {
      setHasError(true);
    } finally {
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectUserId={setSelectedUserId}
                  selectedUserId={selectedUserId}
                  selectPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                { isLoaded && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isLoaded && !posts.length && selectedUserId > 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>

                )}

                {selectedUserId > 0 && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectPost={setSelectedPost}
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
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails selectedPost={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
