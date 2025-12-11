import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import * as apiUsers from './api/users';
import * as apiPosts from './api/posts';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getUsersFromServer = async () => {
      try {
        setLoadingUsers(true);
        setErrorMessage('');
        const usersFromServer = await apiUsers.getUsers();

        setUsers(usersFromServer);
      } catch {
        setErrorMessage('Failed to get users from server');
      } finally {
        setLoadingUsers(false);
      }
    };

    getUsersFromServer();
  }, []);

  useEffect(() => {
    if (selectedUser === null) {
      return;
    }

    const loadPosts = async () => {
      try {
        setErrorMessage('');
        setSelectedPost(null);
        setLoadingPosts(true);
        const posts = await apiPosts.getUserPosts(selectedUser.id);

        setUserPosts(posts);
      } catch {
        setErrorMessage('Failed to get user posts from server');
      } finally {
        setLoadingPosts(false);
      }
    };

    loadPosts();
  }, [selectedUser]);

  const isPlugVisible =
    userPosts.length === 0 && !errorMessage && !loadingPosts && selectedUser;

  const isPostsVisible =
    userPosts.length > 0 && !errorMessage && !loadingPosts && selectedUser;

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
                  isLoading={loadingUsers}
                  onSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingPosts && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {isPlugVisible && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isPostsVisible && (
                  <PostsList
                    posts={userPosts}
                    selectedPost={selectedPost}
                    onSelectedPost={setSelectedPost}
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
