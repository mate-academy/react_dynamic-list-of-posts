import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts, getUsers } from './utils/fetchClient';
import { IUser } from './types/User';
import { IPost } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [activeUser, setActiveUser] = useState<IUser | null>(null);

  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [activePost, setActivePost] = useState<IPost | null>(null);

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoding, setIsLoading] = useState<boolean>(false);

  const changeUser = useCallback((user: IUser) => {
    setActiveUser(user);
  }, []);

  const changePost = useCallback((post: IPost | null) => {
    setActivePost(post);
  }, []);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setIsError(true));
  }, []);

  useEffect(() => {
    if (!activeUser) {
      return;
    }

    setActivePost(null);
    setPosts(null);

    setIsLoading(true);
    getUserPosts(activeUser.id)
      .then(setPosts)
      .finally(() => setIsLoading(false));
  }, [activeUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  changeUser={changeUser}
                  activeUser={activeUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoding && (
                  <Loader />
                )}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts && (
                  <PostsList
                    posts={posts}
                    changePost={changePost}
                    activePost={activePost}
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
            {activePost && (
              <div className="tile is-child box is-success ">
                <PostDetails activePost={activePost} />
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};
