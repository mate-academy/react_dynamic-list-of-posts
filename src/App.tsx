import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './utils/getUsers';
import { getPosts } from './utils/getPosts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadUser = async () => {
    try {
      setHasError(false);

      const userFromServer = await getUsers();

      setUsers(userFromServer);
    } catch {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const getPostsList = async (user : User) => {
    try {
      setIsLoading(true);
      setHasError(false);
      setSelectedUser(null);

      const postsFromServer = await getPosts(user.id);

      setSelectedUser(user);
      setPosts(postsFromServer);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handlePostInfo = (postId: number) => {
    if (posts) {
      setSelectedPost(posts.find(post => post.id === postId) || null);
    }

    setSidebarOpen(postId !== 0);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} onChange={getPostsList} />
              </div>

              <div className="block" data-cy="MainContent">
                {(!selectedUser && !isLoading && !hasError) && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {(isLoading && !hasError) && (
                  <Loader />
                )}

                {(hasError && !isLoading) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser && (
                  !posts?.length
                    ? (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    ) : (
                      <PostsList
                        posts={posts}
                        handlePostInfo={handlePostInfo}
                      />
                    )
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
              { 'Sidebar--open': sidebarOpen },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
