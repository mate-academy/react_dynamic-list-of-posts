/* eslint-disable object-curly-newline */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';

import { User } from './types/User';
import { Post } from './types/Post';

import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);

  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [loadPostsError, setLoadPostsError] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const isDangerErrorShow = useMemo(() => {
    return !isLoaderActive && loadPostsError;
  }, [isLoaderActive, loadPostsError]);

  const isWarningErrorShow = useMemo(() => {
    return !isLoaderActive && activeUser && !userPosts.length;
  }, [isLoaderActive, activeUser, userPosts]);

  const isPostListShow = useMemo(() => {
    return !isLoaderActive && userPosts.length;
  }, [isLoaderActive, userPosts]);

  const getUserPost = useCallback((userId: number) => {
    setIsLoaderActive(true);
    setLoadPostsError(false);
    setActivePost(null);

    getUserPosts(userId)
      .then(setUserPosts)
      .catch(() => setLoadPostsError(true))
      .finally(() => setIsLoaderActive(false));
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
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                  getUserPost={getUserPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoaderActive && <Loader />}

                {isDangerErrorShow && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isWarningErrorShow && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isPostListShow && (
                  <PostsList
                    userPosts={userPosts}
                    activePost={activePost}
                    setActivePost={setActivePost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': activePost,
            })}
          >
            <div className="tile is-child box is-success">
              {activePost && (
                <PostDetails
                  post={activePost}
                  isFormActive={isFormActive}
                  setIsFormActive={setIsFormActive}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
