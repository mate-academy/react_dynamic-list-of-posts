import React, { useContext, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './Api/getItems';
import { DispatchContext, StateContext } from './components/store/store';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { userPosts, vaitingUserPost, activeUserId, errorPost, activePostId } =
    useContext(StateContext);

  const noHavePost = !!(
    activeUserId &&
    !userPosts.length &&
    !errorPost &&
    !vaitingUserPost
  );

  useEffect(() => {
    getUsers()
      .then(data => dispatch({ type: 'SET_USERS', users: data }))
      .catch(() => {})
      .finally(() => {});
  }, [dispatch]);

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
                {!activeUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {vaitingUserPost && <Loader />}

                {errorPost && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noHavePost && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!userPosts.length && <PostsList />}
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
              { 'Sidebar--open': !!activePostId },
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
