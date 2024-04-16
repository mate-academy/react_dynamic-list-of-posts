import React, { useContext, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { AppContext } from './context/context';
import { getPosts } from './api/posts';
import { Errors } from './enums/Errors';

export const AppContexts: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    setErrorMessage,
    errorMessage,
    selectedUser,
    setPosts,
    posts,
    selectedPost,
  } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    setPosts([]);
    setErrorMessage(null);

    if (selectedUser) {
      getPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => setErrorMessage(Errors.LoadPosts))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser, setErrorMessage, setPosts]);

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
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {Errors.LoadPosts}
                  </div>
                )}

                {selectedUser &&
                  !isLoading &&
                  !errorMessage &&
                  (!posts.length ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      {Errors.NoPost}
                    </div>
                  ) : (
                    <PostsList />
                  ))}
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
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
