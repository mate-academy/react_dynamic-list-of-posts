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
  const [isFindPosts, setIsFindPosts] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activePost, setActivePost] = useState<null | Post>(null);

  const getUserPosts = async (user: User) => {
    setIsError(false);
    setIsFindPosts(true);

    try {
      const response = await getPosts(user.id);

      setCurrentUserPosts(response);

      setIsFindPosts(false);
    } catch {
      setIsFindPosts(false);
      setIsError(true);
    }

    setIsFindPosts(false);
  };

  useEffect(() => {
    getUsers()
      .then(value => {
        setUsers(value);
      });
  }, []);

  // useMemo(() => setActivePost(null), [activePost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  currentUser={currentUser as User}
                  setCurrentUser={user => setCurrentUser(user)}
                  getUserPosts={getUserPosts}
                  setActivePost={() => setActivePost(null)}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currentUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isFindPosts && (
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
                  && !isFindPosts
                ) && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {(currentUserPosts.length > 0) && (
                  <PostsList
                    currentUserPosts={currentUserPosts}
                    activePost={activePost as Post}
                    setActivePost={post => setActivePost(post)}
                  />
                )}

              </div>
            </div>
          </div>

          {activePost && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails
                  activePost={activePost}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
