import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers, getUsersPosts } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import { Error } from './types/Error';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [chosenUser, setChosenUser] = useState<User | null>(null);
  const [chosenPost, setChosenPost] = useState<Post | null>(null);
  const [usersPosts, setUsersPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getUsers().then(setUsers).catch();
  }, []);

  useEffect(() => {
    if (chosenUser) {
      setIsLoadingPosts(true);

      // Get posts if a user has been chosen
      getUsersPosts(chosenUser.id)
        .then(setUsersPosts)
        .catch(() => setError(Error.CannotLoadPosts))
        .finally(() => setIsLoadingPosts(false));
    }
  }, [chosenUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  chosenUser={chosenUser}
                  setChosenUser={setChosenUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!chosenUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {chosenUser && !usersPosts.length && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!usersPosts.length && (
                  <PostsList
                    posts={usersPosts}
                    chosenPost={chosenPost}
                    handlePostChange={setChosenPost}
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
              { 'Sidebar--open': chosenPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
