import React, { useContext, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/api';
import { User } from './types/User';
import { DispatchContext, StateContext } from './store/store';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useContext(DispatchContext);
  const {
    selectedUser,
    userPosts,
    errorMessage,
    selectedPost,
  } = useContext(StateContext);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        dispatch({ type: 'setError', payload: 'Can\'t get users' });
        setTimeout(() => {
          dispatch({ type: 'setError', payload: '' });
        }, 3000);
      });
  }, [dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} setIsLoading={setIsLoading} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && (<Loader />)}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {selectedUser
                  && !userPosts.length
                  && !isLoading
                  && !errorMessage
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {selectedUser && !!userPosts.length && (
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
              'Sidebar', {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (<PostDetails />)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
