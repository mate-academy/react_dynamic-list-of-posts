import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getAllUsers, getPosts } from './api';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openedPost, setOpenedPost] = useState<Post | null>(null);

  const shouldShowNoPostsMessage =
    !errorMessage && !isLoading && selectedUser && !posts.length;

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      });
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setIsLoading(true);
    getPosts(selectedUser?.id)
      .then(setPosts)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedUser]);

  const handleSelectUser = (newUser: User) => {
    setSelectedUser(newUser);
    setOpenedPost(null);
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
                  onSelect={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {shouldShowNoPostsMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!isLoading && !!posts.length && (
                  <PostsList
                    posts={posts}
                    openedPost={openedPost}
                    onOpen={setOpenedPost}
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
              { 'Sidebar--open': openedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {openedPost && <PostDetails post={openedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
