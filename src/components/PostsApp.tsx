import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import { PostsList } from './PostsList';
import { UserSelector } from './UserSelector';
import { usePosts } from '../hooks/usePosts';
import { getPosts, getUsers } from '../api/postService';
import { Loader } from './Loader';
import { PostDetails } from './PostDetails';
import { ErrorNotification } from './ErrorNotification';

export const PostsApp: React.FC = () => {
  const {
    selectedUser,
    setUsers,
    setUserPosts,
    userPosts,
    selectedPost,
  } = usePosts();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getUsers()
      .then(usersFromServer => {
        setUsers(usersFromServer);
      })
      .catch();
  }, [setUsers]);

  useEffect(() => {
    if (selectedUser) {
      setErrorMessage('');
      setIsLoading(true);

      getPosts(selectedUser.id)
        .then(postsFromServer => {
          setUserPosts(postsFromServer);
        })
        .catch(error => setErrorMessage(error))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser, setUserPosts, setErrorMessage]);

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
                {!errorMessage && (
                  <>
                    {!selectedUser ? (
                      <p data-cy="NoSelectedUser">
                        No user selected
                      </p>
                    ) : (
                      <>
                        {isLoading ? (
                          <Loader />
                        ) : (
                          <>
                            {!userPosts?.length ? (
                              <div
                                className="notification is-warning"
                                data-cy="NoPostsYet"
                              >
                                No posts yet
                              </div>
                            ) : (
                              <PostsList />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}

                {errorMessage && (
                  <ErrorNotification />
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
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
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
