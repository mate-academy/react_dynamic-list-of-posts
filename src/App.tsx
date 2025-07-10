import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import React, { useEffect, useState } from 'react';
import { Post } from './types/Post';
import { User } from './types/User';
import { findPost } from './utils/findPost';
import { getPosts, getUsers } from './api/api';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setIsError(true);
      });
  }, []);

  const handleUserSelect = (user: User) => {
    setSelectedPost(null);
    setIsError(false);
    setSelectedUser(user);
    setIsLoading(true);

    getPosts(user.id)
      .then(setUserPosts)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePostToggle = (id: number) => {
    setSelectedPost(prev =>
      prev?.id === id ? null : (findPost(userPosts, id) ?? null),
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      );
    }

    if (!selectedUser) {
      return <p data-cy="NoSelectedUser">No user selected</p>;
    }

    if (selectedUser && userPosts.length === 0 && !isLoading) {
      return (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      );
    }

    if (userPosts && userPosts.length > 0 && !isError) {
      return (
        <PostsList
          posts={userPosts}
          selectedPost={selectedPost}
          handlePost={handlePostToggle}
        />
      );
    }

    return null;
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSelect={handleUserSelect}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {renderContent()}
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
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails key={selectedPost.id} post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
