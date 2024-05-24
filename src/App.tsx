import React, { useContext, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { DispatchContext, StateContext } from './context/GlobalPostsProvider';
import { client } from './utils/fetchClient';
import { User } from './types/User';

export const App: React.FC = () => {
  const {
    user, posts, isPostsLoading,
    postsFetchError, isOpenPostBody
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await client.get<User[]>('/users');

        dispatch({ type: 'setUsers', users: fetchedUsers });
      } catch (error) {
        dispatch({ type: 'setPostsFetchError', postsFetchError: true });
      }
    };

    fetchUsers();
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
                {isPostsLoading && <Loader />}

                {!user && !postsFetchError && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postsFetchError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isPostsLoading && posts.length > 0 &&
                  !postsFetchError && user && (
                  <PostsList />
                )}

                {!isPostsLoading && !posts.length && user
                  && !postsFetchError && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
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
              { 'Sidebar--open': isOpenPostBody },
            )}
          >
            <div className="tile is-child box is-success ">
              {isOpenPostBody && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
