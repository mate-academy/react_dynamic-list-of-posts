import React, { useContext, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/getUsers';
import { DispatchContext, StateContext } from './utils/GlobalStateProvider';
import { getPosts } from './api/getPosts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { selectedUser, isPostSelected } = useContext(StateContext);

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    dispatch({ type: 'setIsPostSelected', payload: false });
    dispatch({ type: 'setIsFormEnabled', payload: false });

    if (selectedUser) {
      getPosts(selectedUser.id)
        .then(dataPosts => {
          setPosts(dataPosts);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedUser, dispatch]);

  useEffect(() => {
    getUsers().then(users => {
      dispatch({ type: 'setUsers', payload: users });
    });
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
                {selectedUser ? (
                  <>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {posts?.length === 0 ? (
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
                              <PostsList posts={posts} />
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

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': isPostSelected,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {posts && isPostSelected && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
