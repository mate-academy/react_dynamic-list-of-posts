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
import { getUsers } from './services/users';
import { getUserPosts } from './services/userPosts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);

      getUserPosts(selectedUser.id)
        .then(setUserPosts)
        .catch(() => setErrorMessage('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  const handleClickButton = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
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
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && (
                  <Loader />
                )}
                {!isLoading && errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {!isLoading && userPosts.length > 0 && (
                  <PostsList
                    posts={userPosts}
                    selectedPost={selectedPost}
                    onClick={handleClickButton}
                  />
                )}

                {!isLoading && !errorMessage && !userPosts.length && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
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
              <PostDetails
                selectedPost={selectedPost}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
