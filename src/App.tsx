import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers, getPostsOfUser } from './api/api';
import { Errors } from './types/Errors';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [error, setError] = useState(Errors.NONE);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const loadUsers = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      setError(Errors.USERS);
    }
  };

  const loadSelectedUserPosts = async () => {
    if (selectedUser) {
      try {
        setIsLoading(true);
        const posts = await getPostsOfUser(selectedUser.id);

        setUserPosts(posts);
      } catch {
        setError(Errors.POSTS);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    loadSelectedUserPosts();
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
                  setSelectedUser={setSelectedUser}
                  error={error}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isLoading
                  ? <Loader />
                  : (
                    <>
                      {(error === Errors.POSTS || error === Errors.USERS) && (
                        <div
                          className="notification is-danger"
                          data-cy="PostsLoadingError"
                        >
                          {error}
                        </div>
                      )}

                      {!selectedUser && error === Errors.NONE && (
                        <p data-cy="NoSelectedUser">
                          No user selected
                        </p>
                      )}

                      {selectedUser
                      && !userPosts.length
                      && error !== Errors.POSTS
                      && (
                        <div
                          className="notification is-warning"
                          data-cy="NoPostsYet"
                        >
                          No posts yet
                        </div>
                      )}

                      {userPosts.length > 0 && (
                        <PostsList
                          posts={userPosts}
                          selectedPost={selectedPost}
                          setSelectedPost={setSelectedPost}
                          setLoadingComments={setIsLoadingComments}
                        />
                      )}
                    </>
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
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  error={error}
                  setError={setError}
                  isLoadingComments={isLoadingComments}
                  setIsLoadingComments={setIsLoadingComments}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
