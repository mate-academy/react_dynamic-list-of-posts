import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { getUsers } from './api/users';
import { getPosts } from './api/posts';

import { Post } from './types/Post';
import { User } from './types/User';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  async function loadUsers() {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      throw new Error('Unable to load users from server');
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsersPosts(user: User) {
    setIsLoadingPosts(true);

    try {
      const postsFromServer = await getPosts(user.id);

      setPosts(postsFromServer);
    } catch (error) {
      setHasError(true);
      throw new Error('Unable to load posts from server');
    } finally {
      setIsLoadingPosts(false);
    }
  }

  useEffect(() => {
    if (selectedUser) {
      loadUsersPosts(selectedUser);
    }

    setSelectedPost(null);
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
                  onSelectUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingPosts && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser && !isLoadingPosts && (
                  <PostsList
                    posts={posts}
                    onSelectPost={setSelectedPost}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
