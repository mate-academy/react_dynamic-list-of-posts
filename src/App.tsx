import React, { useContext, useMemo, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { AppContext } from './AppContext';
import { User } from './types/User';
import * as service from './api/api';

export const App: React.FC = () => {
  const {
    // users,
    selectedUser,
    posts,
    setPosts,
    selectedPost,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const noPostsMessage = useMemo(
    () => (!isLoading && !isError && !posts.length && selectedUser),
    [isLoading, isError, posts.length, selectedUser],
  );

  const onUserSelect = (user: User) => {
    setIsError(false);
    setIsLoading(true);

    service.getPosts(user.id)
      .then(setPosts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  // console.log(posts);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">

              <div className="block">
                <UserSelector
                  onUserSelect={onUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostsMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails selectedPost={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
