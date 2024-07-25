import React, { useContext, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { DispatchContext, StatesContext } from './context/Store';
import { getPostsByUserId } from './api/posts';
import { getUsers } from './api/users';
import { getCommentsByPostId } from './api/comments';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const {
    selectedUserId,
    isLoading,
    hasError,
    errorMessage,
    postsByUserId,
    selectedPostId,
    isSidebarOpen,
  } = useContext(StatesContext);

  const isNoPostsYetActive =
    postsByUserId.length === 0 && selectedUserId && !isLoading && !hasError;

  const isPostListActive =
    postsByUserId.length !== 0 && selectedUserId && !hasError && !isLoading;

  function fetchUsers() {
    dispatch({ type: 'SET_ISLOADING', payload: true });
    getUsers()
      .then(usersFromServer => {
        dispatch({ type: 'SET_USERS', payload: usersFromServer });
        dispatch({ type: 'SET_ISLOADING', payload: false });
      })
      .catch(() => {
        dispatch({ type: 'SET_ISLOADING', payload: false });
        dispatch({ type: 'SET_ERRORMESSAGE', payload: 'Unable to load users' });
      });
  }

  function fetchPostsByUser() {
    dispatch({ type: 'SET_ISLOADING', payload: true });
    if (selectedUserId) {
      getPostsByUserId(selectedUserId)
        .then(postsFromServer => {
          dispatch({ type: 'SET_POSTSBYUSERID', payload: postsFromServer });
          dispatch({ type: 'SET_ISLOADING', payload: false });
        })
        .catch(() => {
          dispatch({ type: 'SET_HASERROR', payload: true });
          dispatch({
            type: 'SET_ERRORMESSAGE',
            payload: 'Unable to load posts',
          });
          dispatch({ type: 'SET_ISLOADING', payload: false });
        });
    }
  }

  function fetchCommentsByPostId() {
    dispatch({ type: 'SET_ISLOADING', payload: true });
    if (selectedPostId) {
      getCommentsByPostId(selectedPostId)
        .then(commentsFromServer => {
          dispatch({
            type: 'SET_COMMENTSBYPOSTID',
            payload: commentsFromServer,
          });
          dispatch({ type: 'SET_ISLOADING', payload: false });
        })
        .catch(() => {
          dispatch({
            type: 'SET_HASCOMMENTERROR',
            payload: true,
          });
          dispatch({ type: 'SET_ISLOADING', payload: false });
        });
    }
  }

  useEffect(() => dispatch({ type: 'SET_HASERROR', payload: false }), []);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchPostsByUser();
  }, [selectedUserId]);

  useEffect(() => {
    fetchCommentsByPostId();
  }, [selectedPostId]);

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
                <p data-cy="NoSelectedUser">
                  {!selectedUserId && 'No user selected'}
                </p>

                {isLoading && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {isNoPostsYetActive && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {isPostListActive && <PostsList />}
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
              { 'Sidebar--open': isSidebarOpen },
            )}
          >
            {selectedPostId && (
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
