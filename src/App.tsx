import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { DispatchContext, ReducerActions, StateContext } from './AppContext';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { Post } from './types/Post';
import { client } from './utils/fetchClient';

import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);

  const {
    selectedUser,
    userPosts,
    selectedPost,
    isUserPostsLoading,
    isUserPostsError,
  } = useContext(StateContext);

  const getUserPosts = async () => {
    if (selectedUser) {
      dispatch({
        type: ReducerActions.setIsUserPostsLoading,
        payload: true,
      });

      await client.get<Post[]>(`/posts?userId=${selectedUser.id}`)
        .then(res => {
          dispatch({
            type: ReducerActions.setUserPosts,
            payload: res,
          });
        })
        .catch(() => dispatch({
          type: ReducerActions.setIsUserPostsError,
          payload: true,
        }))
        .finally(() => dispatch({
          type: ReducerActions.setIsUserPostsLoading,
          payload: false,
        }));
    }
  };

  useEffect(() => {
    getUserPosts();
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
                {selectedUser === null && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isUserPostsLoading && <Loader />}

                {isUserPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isUserPostsLoading && !isUserPostsError && selectedUser
                && userPosts?.length === 0 && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {!isUserPostsLoading && !isUserPostsError && selectedUser
                && userPosts?.length !== 0 && (
                  <PostsList />
                )}
              </div>
            </div>
          </div>

          {/* {selectedPost && ( */}
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
          {/* )} */}
        </div>
      </div>
    </main>
  );
};
