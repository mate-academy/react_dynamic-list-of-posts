import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import * as userService from './services/user';
import * as postService from './services/post';
import { Post } from './types/Post';
import { useLoadingState } from './customHooks/useLoadingState';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    userService.getUsers().then(setUsers);
  }, []);

  function loadPosts() {
    setErrorMessage('');
    if (selectedUser === null) {
      setLoading(false);

      return;
    }

    setLoading(true);

    postService.getUserPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setLoading(false));
  }

  useEffect(loadPosts, [selectedUser]);

  const { hasError, hasNoList, shouldRenderItems } = useLoadingState({
    loading,
    errorMessage,
    selectedItem: selectedUser,
    list: posts,
  });

  const isUserNotSelected = !loading && !errorMessage && !selectedUser;

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
                  setSelectedUser={setSelectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isUserNotSelected && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loading && (
                  <Loader />
                )}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {hasNoList && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {shouldRenderItems && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
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
