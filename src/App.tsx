/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { getUserPosts, getUsers } from './api/posts';
import { DispatchContext, StateContext } from './utils/Store';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { selectedUser, userPosts, isSelectedPost } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getUsers().then(dataUsers => {
      dispatch({
        type: 'setUsers',
        payload: dataUsers,
      });
    });
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    if (selectedUser) {
      getUserPosts(selectedUser?.id)
        .then(dataPosts => {
          dispatch({
            type: 'setUserPosts',
            payload: dataPosts,
          });
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [dispatch, selectedUser]);

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
                <div className="block" data-cy="MainContent">
                  {selectedUser ? (
                    <>
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <>
                          {userPosts?.length === 0 ? (
                            <div
                              className="notification is-warning"
                              data-cy="NoPostsYet"
                            >
                              No posts yet
                            </div>
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
                                <PostsList />
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <p data-cy="NoSelectedUser">No user selected</p>
                  )}
                </div>
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
              {
                'Sidebar--open': isSelectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {isSelectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
