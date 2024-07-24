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
import { NewPost } from './components/NewPost';
import { getPostsByUserId } from './api/posts';
import { getUsers } from './api/users';
import { getCommentsByPostId } from './api/comments';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const {
    selectedUserId,
    users,
    isLoading,
    commentErrorMessage,
    postsByUserId,
    selectedPostId,
    commentsByPostId,
    isSidebarOpen,
  } = useContext(StatesContext);

  async function fetchUsers() {
    dispatch({ type: 'SET_ISLOADING', payload: true });
    const usersFromServer = await getUsers();

    if ('Error' in usersFromServer) {
      dispatch({ type: 'SET_ERRORMESSAGE', payload: 'Unable to load users' });
      dispatch({ type: 'SET_ISLOADING', payload: false });

      return;
    }

    dispatch({ type: 'SET_USERS', payload: usersFromServer });
    dispatch({ type: 'SET_ISLOADING', payload: false });
  }

  async function fetchPostsByUser() {
    dispatch({ type: 'SET_ISLOADING', payload: true });
    if (selectedUserId) {
      const postsFromServer = await getPostsByUserId(selectedUserId);

      if ('Error' in postsFromServer) {
        dispatch({
          type: 'SET_ERRORMESSAGE',
          payload: 'Unable to load posts',
        });
        dispatch({ type: 'SET_ISLOADING', payload: false });

        return;
      }

      dispatch({ type: 'SET_POSTSBYUSERID', payload: postsFromServer });
      dispatch({ type: 'SET_ISLOADING', payload: false });
    }
  }

  async function fetchCommentsByPostId() {
    dispatch({ type: 'SET_ISLOADING', payload: true });
    if (selectedPostId) {
      const commentsFromServer = await getCommentsByPostId(selectedPostId);

      if ('Error' in commentsFromServer) {
        dispatch({
          type: 'SET_ERRORMESSAGE',
          payload: 'Unable to load comments',
        });
        dispatch({ type: 'SET_ISLOADING', payload: false });

        return;
      }

      dispatch({ type: 'SET_COMMENTSBYPOSTID', payload: commentsFromServer });
      dispatch({ type: 'SET_ISLOADING', payload: false });
    }
  }

  useEffect(() => {
    fetchPostsByUser();
  }, [selectedUserId]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchCommentsByPostId();
  }, [commentsByPostId]);

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
                  {selectedUserId
                    ? users.find(user => selectedUserId === user.id)?.name
                    : 'No user selected'}
                </p>

                {isLoading && <Loader />}

                {commentErrorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {commentErrorMessage}
                  </div>
                )}

                {postsByUserId.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                <NewPost />
                {postsByUserId.length !== 0 && <PostsList />}
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
            <div className="tile is-child box is-success ">
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
