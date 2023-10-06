import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { usePosts } from './components/PostContext';
import * as postService from './services/post';
import * as userService from './services/user';

export const PostApp: React.FC = () => {
  const {
    selectedUser,
    posts,
    setPosts,
    selectedPost,
    setUsers,
  } = usePosts();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getUserPosts = (id: number) => {
    setIsLoading(true);

    return postService.getUserPosts(id)
      .then((userPosts) => {
        setPosts(userPosts);
      })
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  };

  const loadUsers = () => {
    return userService.getUsers()
      .then((usersFromAPI) => {
        setUsers(usersFromAPI);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  useEffect(() => {
    loadUsers();
  });

  useEffect(() => {
    if (selectedUser) {
      getUserPosts(selectedUser.id);
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
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

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {(selectedUser && !isLoading && !errorMessage) && (
                  posts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList />
                  )
                )}

              </div>
            </div>
          </div>

          {selectedUser && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                {
                  'Sidebar--open': selectedPost,
                },
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
