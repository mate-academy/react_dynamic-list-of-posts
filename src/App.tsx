import React, { useContext, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { UserContext } from './UserProvider';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { PostContext } from './PostProvider';

export const App: React.FC = () => {
  const { setUsers, selectedUser } = useContext(UserContext);
  const { setPosts, selectedPost, posts } = useContext(PostContext);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      getPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => setIsError(true))
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
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : (
                  <>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {isError ? (
                          <div
                            className="notification is-danger"
                            data-cy="PostsLoadingError"
                          >
                            Something went wrong!
                          </div>
                        ) : (
                          <>
                            {!posts.length ? (
                              <div
                                className="notification is-warning"
                                data-cy="NoPostsYet"
                              >
                                No posts yet
                              </div>
                            ) : (
                              <PostsList />
                            )}
                          </>
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
