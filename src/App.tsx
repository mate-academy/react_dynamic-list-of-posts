/* eslint-disable max-len */
import React, { useContext } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { AppContext } from './components/Context';

export const App: React.FC = () => {
  const appContext = useContext(AppContext);

  const {
    selectedUser,
    userPosts,
    selectedPostId,
    isLoadingList,
    error,
  } = appContext;

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
                {selectedUser
                  ? ''
                  : <p data-cy="NoSelectedUser">No user selected</p>}

                {isLoadingList
                  && <Loader />}

                {error
                  && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )}

                {!!selectedUser && !isLoadingList
                  && (
                    <>
                      {userPosts.length > 0
                        ? (
                          <PostsList />
                        )
                        : (
                          <div className="notification is-warning" data-cy="NoPostsYet">
                            No posts yet
                          </div>
                        )}
                    </>
                  )}
              </div>
            </div>
          </div>

          {!!selectedPostId
            && (
              <div
                data-cy="Sidebar"
                className={cn(
                  'tile',
                  'is-parent',
                  'is-8-desktop',
                  'Sidebar',
                  'Sidebar--open',
                )}
              >
                <div className="tile is-child box is-success ">
                  <PostDetails />
                </div>
              </div>
            )}
        </div>
      </div>
    </main>
  );
};
