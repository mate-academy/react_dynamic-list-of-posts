import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useCallback, useEffect, useState } from 'react';
import { User } from './types/User';
import { getUserPosts, getUsers } from './api/api';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadUsers = async () => {
    try {
      const fetchedUsers = await getUsers();

      setUsers(fetchedUsers);
    } catch (error) {
      setErrorMessage('Unable to load users');
    }
  };

  const loadPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const userPosts = await getUserPosts(selectedUser?.id);

      setPosts(userPosts);
    } catch (error) {
      setErrorMessage('Something went wrong!');
    } finally {
      setLoadingPosts(false);
    }
  }, [selectedUser?.id]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser?.id !== undefined) {
      loadPosts();
    }
  }, [loadPosts, selectedUser?.id]);

  const handlePostSelect = (post: Post | null) => {
    setSelectedPost(post);
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
                  selectedUser={selectedUser}
                  onSelectUser={user => {
                    setSelectedUser(user);
                    setSelectedPost(null);
                  }}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : loadingPosts ? (
                  <Loader />
                ) : errorMessage ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                ) : posts.length === 0 ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelectPost={handlePostSelect}
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails post={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
