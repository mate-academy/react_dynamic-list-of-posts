import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { getUserPosts, getUsers } from './api/api';
import { Post } from './types/Post';
import { Loader } from './components/Loader';
import { ErrorType } from './types/ErrorType';
import { ErrorMessage } from './components/ErrorMessage';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);

  const hasNoPosts = (
    selectedUser
    && !userPosts.length
    && !isLoading
    && errorType !== ErrorType.POSTS
  );
  const hasPosts = (
    selectedUser
    && !!userPosts.length
    && !isLoading
    && errorType !== ErrorType.POSTS
  );

  const loadUsers = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      setErrorType(ErrorType.USERS);
    }
  };

  const loadPosts = async () => {
    if (!selectedUser) {
      return;
    }

    try {
      const postsFromServer = await getUserPosts(selectedUser.id);

      setUserPosts(postsFromServer);
    } catch {
      setErrorType(ErrorType.POSTS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsLoading(true);
    setSelectedPost(null);
  };

  useEffect(() => {
    setErrorType(null);
    loadPosts();
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
                  selectedUser={selectedUser}
                  users={users}
                  onUserSelected={handleUserSelect}
                  isError={errorType === ErrorType.USERS}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && !errorType && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {(
                  errorType === ErrorType.POSTS || errorType === ErrorType.USERS
                )
                  && (
                    <ErrorMessage
                      errorType={errorType}
                    />
                  )}

                {hasNoPosts && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {hasPosts && (
                  <PostsList
                    posts={userPosts}
                    onPostSelect={setSelectedPost}
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
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  onError={setErrorType}
                  errorType={errorType}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
