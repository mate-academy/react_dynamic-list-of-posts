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
import { getUsers, getPosts } from './api';
import { Post } from './types/Post';
import { ErrorTypes } from './types/ErrorAction';
import { NotificationError } from './components/NotificationError';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<ErrorTypes | null>(null);
  const [isSelectedUser, setIsSelectedUser] = useState(false);
  const [selectPost, setSelectPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers()
      .then(result => {
        setUsers(result);
      })
      .catch(() => {
        setErrorType(ErrorTypes.USERS);
      });
  }, []);

  const getPostsById = (id:number) => {
    setIsLoading(true);
    getPosts(id)
      .then(result => {
        setPosts(result);
        setIsSelectedUser(true);
      })
      .catch(() => {
        setErrorType(ErrorTypes.POSTS);
      })
      .finally(() => setIsLoading(false));
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
                  getPostsById={getPostsById}
                  setSelectPost={setSelectPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!isSelectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {errorType === ErrorTypes.USERS && (
                  <NotificationError
                    errorMessage={ErrorTypes.USERS.toString()}
                    labelData="PostsLoadingError"
                  />
                )}

                {errorType === ErrorTypes.POSTS && (
                  <NotificationError
                    errorMessage={ErrorTypes.POSTS.toString()}
                    labelData="PostsLoadingError"
                  />
                )}

                {isLoading && <Loader />}

                {(isSelectedUser && !isLoading) && (
                  <PostsList
                    posts={posts}
                    setSelectPost={setSelectPost}
                    selectPost={selectPost}
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
              { 'Sidebar--open': selectPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectPost && (<PostDetails selectPost={selectPost} />)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
