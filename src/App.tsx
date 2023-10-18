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
import { Post } from './types/Post';
import { getUserPosts } from './api/post';
import { getUsers } from './api/user';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [chosenPost, setChosenPost] = useState<Post | null>(null);

  const [isUserLoadingError, setIsUserLoadingError] = useState(false);
  const [isPostsLoadingError, setIsPostsLoadingError] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setIsUserLoadingError(true);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setChosenPost(null);
      setIsPostsLoadingError(false);
      setIsPostsLoading(true);

      getUserPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => setIsPostsLoadingError(true))
        .finally(() => setIsPostsLoading(false));
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
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && !isUserLoadingError && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isUserLoadingError && (
                  <div className="notification is-danger">
                    Unable to load users.
                    Please, check your connection and reload page.
                  </div>
                )}

                {selectedUser && (
                  <>
                    {isPostsLoading && (
                      <Loader />
                    )}

                    {isPostsLoadingError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {!isPostsLoadingError && !isPostsLoading && (
                      <>
                        {!posts.length ? (
                          <div
                            className="notification is-warning"
                            data-cy="NoPostsYet"
                          >
                            No posts yet
                          </div>
                        ) : (
                          <PostsList
                            posts={posts}
                            chosenPost={chosenPost}
                            setChosenPost={setChosenPost}
                          />
                        )}
                      </>
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
              { 'Sidebar--open': chosenPost },
            )}
          >
            {chosenPost && (
              <div className="tile is-child box is-success ">
                <PostDetails chosenPost={chosenPost} />
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
};
