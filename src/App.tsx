import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useEffect, useState } from 'react';
import { User } from './types/User';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadUsers = async () => {
    setIsLoading(true);
    setError('');
    try {
      const fetchedUsers = await client.get<User[]>('/users');

      if (fetchedUsers.length === 0) {
        throw new Error('No users found. Please try a different search.');
      }

      setUsers(fetchedUsers);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserPosts = async (userId: number) => {
    setIsLoading(true);
    setError('');
    try {
      const fetchedPosts = await client.get<Post[]>(`/posts?userId=${userId}`);

      setPosts(fetchedPosts);
    } catch (err) {
      setError('Failed to load posts due to network issues');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      loadUserPosts(selectedUser.id);
      setSelectedPost(null);
    }
  }, [selectedUser]);

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
                  selectedUser={selectedUser}
                  onSelectUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && posts.length === 0 && !isLoading && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoading && <Loader />}
                {error && (
                  <div
                    data-cy="PostsLoadingError"
                    className="notification is-danger"
                  >
                    {error}
                  </div>
                )}

                {!isLoading && !!posts.length ? (
                  <PostsList
                    posts={posts}
                    openedPost={selectedPost}
                    onOpen={setSelectedPost}
                  />
                ) : (
                  !isLoading &&
                  !error &&
                  posts.length === 0 &&
                  selectedUser && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
