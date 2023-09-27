import React, { useContext, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { UserSelector } from './components/UserSelector';
import { getAllUsers } from './utils/loadutil';
import { User } from './types/User';
import { PostsList } from './components/PostsList';
import { Post } from './types/Post';
import { StateContext } from './components/AppContext';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';
import { ACTIONS } from './utils/enums';

export const App: React.FC = () => {
  const [users, setAllUsers] = useState([] as User[]);
  const [postsByUser, setPostByUser] = useState([] as Post[]);
  const { state, dispatch } = useContext(StateContext);

  const getPosts = (posts: Post[]) => {
    setPostByUser(posts);
  };

  function checkPosts() {
    if (postsByUser.length === 0 && state.selectedUser.id
      && !state.isLoading) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    getAllUsers()
      .then(res => {
        setAllUsers(res);
      })
      .catch(() => dispatch({ type: ACTIONS.SET_ERROR, payload: 'error' }));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector allUsers={users} setPosts={getPosts} />
              </div>

              <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">
                  {(!state.selectedUser.id) && (
                    'No user selected'
                  )}
                </p>
                {postsByUser.length > 0 && (
                  <div className="tile is-child box is-success ">
                    <PostsList usersPosts={postsByUser} />
                  </div>
                )}
                {state.isLoading && (
                  <Loader />
                )}
                {checkPosts() && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {state.error === 'error' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
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
              'Sidebar', {
                'Sidebar--open': state.selectedPost.id,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails post={state.selectedPost} />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};
