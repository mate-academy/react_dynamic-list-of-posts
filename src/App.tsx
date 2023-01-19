import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { getUsers } from './api/users';
import { Loader } from './components/Loader';
import { getPosts } from './api/posts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadUsers = async () => {
    try {
      setIsLoadingError(false);

      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch (error) {
      setIsProcessing(false);
      setIsLoadingError(true);
    }
  };

  const getPostsList = async (user: User) => {
    try {
      setIsProcessing(true);
      setIsLoadingError(false);
      setSelectedUser(null);

      const postsFromServer = await getPosts(user.id);

      setSelectedUser(user);
      setPosts(postsFromServer);
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
      setIsLoadingError(true);
    }
  };

  const handlePostInfo = (postId: number) => {
    if (posts) {
      setSelectedPost(posts.find(post => post.id === postId) || null);
    }

    setIsSidebarOpen(postId !== 0);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onChange={getPostsList}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {(!selectedUser && !isLoadingError && !isProcessing) && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isProcessing && <Loader />}

                {isLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser && (
                  !posts?.length ? (
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
                  ))}
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
              { 'Sidebar--open': isSidebarOpen },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
