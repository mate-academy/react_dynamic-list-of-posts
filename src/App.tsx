/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import * as serviceData from './api/serviceData';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const selectUser = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

  const handleSelectPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  useEffect(() => {
    serviceData.getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);

      serviceData
        .getPostsByUserId(selectedUser.id)
        .then(setUserPosts)
        .catch(() => setErrorMessage('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }
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
                  onClick={selectUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {errorMessage && userPosts.length < 1 && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {!isLoading &&
                  selectedUser &&
                  !userPosts.length &&
                  !errorMessage && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {userPosts.length > 0 && !isLoading && (
                  <PostsList
                    posts={userPosts}
                    onClick={handleSelectPost}
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
                <PostDetails post={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
