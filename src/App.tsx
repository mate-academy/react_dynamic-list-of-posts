import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { getUsers, getPosts } from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserPosts, setCurrentUserPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activePost, setActivePost] = useState<null | Post>(null);

  const getUserPosts = async (user: User) => {
    setIsError(false);
    setIsLoadingPosts(true);

    try {
      const response = await getPosts(user.id);

      setCurrentUserPosts(response);
    } catch {
      setIsError(true);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const hideCommemts = () => {
    setActivePost(null);
    setCurrentUserPosts([]);
  };

  const handleUserSelect = (user: User) => {
    setCurrentUser(user);
    getUserPosts(user);
    hideCommemts();
    setActivePost(null);
    setCurrentUserPosts([]);
  };

  useEffect(() => {
    getUsers()
      .then(value => {
        setUsers(value);
      });
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
                  currentUser={currentUser}
                  onUserSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currentUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingPosts && (
                  <Loader />
                )}

                {isError && (
                  <div
                    className={classNames(
                      'notification',
                      { 'is-danger': isError },
                    )}
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(currentUserPosts.length < 1
                  && currentUser
                  && !isLoadingPosts
                ) && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {(currentUserPosts.length > 0) && (
                  <PostsList
                    currentUserPosts={currentUserPosts}
                    activePost={activePost}
                    setActivePost={setActivePost}
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
              { 'Sidebar--open': activePost },
            )}
          >
            <div className="tile is-child box is-success ">
              {activePost && (
                <PostDetails
                  activePost={activePost}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};
