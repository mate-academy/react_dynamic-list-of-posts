import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import React, { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import * as userService from './services/users';
import * as postService from './services/posts';

export const App = () => {
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [posts, setPosts] = useState<Post[]>([]);

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const toggleComments = (id: number | null) => {
    setSelectedPostId(prev => (prev === id ? null : id));
  };

  const hiddenError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const loadUsers = async () => {
    userService.getUsers().then(setUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadPosts = async () => {
    if (!selectedUser) {
      return;
    }

    setIsPostLoading(true);
    setPosts([]);

    try {
      const loadedPosts = await postService.getPosts(selectedUser.id);

      setPosts(loadedPosts);
    } catch {
      hiddenError('Something went wrong!');
    } finally {
      setIsPostLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const selectedPost = posts.find(post => post.id === selectedPostId);

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
                  onSelect={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostLoading && <Loader />}

                {!isPostLoading &&
                  !errorMessage &&
                  posts.length === 0 &&
                  selectedUser && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {!isPostLoading && !errorMessage && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedUser={selectedUser}
                    selectedPostId={selectedPostId}
                    onToggle={toggleComments}
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
              'Sidebar--open',
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPostId={selectedPostId}
                  selectedPost={selectedPost}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
