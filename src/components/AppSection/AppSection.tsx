import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';

import { PostDetails } from '../PostDetails';
import { PostsList } from '../PostsList';
import { Loader } from '../Loader';
import { UserSelector } from '../UserSelector';
import { AppContext } from '../AppContext';
import * as getService from '../../services/AppServices';

export const AppSection: React.FC = () => {
  const {
    setUsers,
    selectedUser,
    userPosts,
    setUserPosts,
    selectedPost,
  } = useContext(AppContext);
  const [isloading, setisLoading] = useState(false);
  const [hasErrorMessage, setHasErrorMessage] = useState('');

  useEffect(() => {
    getService.getUsers()
      .then(setUsers)
      .catch();
  }, [setUsers]);

  useEffect(() => {
    if (selectedUser) {
      setHasErrorMessage('');
      setisLoading(true);

      getService.getUserPosts(selectedUser.id)
        .then(setUserPosts)
        .catch(() => setHasErrorMessage('Something went wrong!'))
        .finally(() => setisLoading(false));
    }
  }, [setUserPosts, selectedUser]);

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
                {!hasErrorMessage && (
                  <>
                    {!selectedUser ? (
                      <p data-cy="NoSelectedUser">
                        No user selected
                      </p>
                    ) : (
                      <>
                        {isloading && <Loader />}

                        {!isloading && !userPosts.length ? (
                          <div
                            className="notification is-warning"
                            data-cy="NoPostsYet"
                          >
                            No posts yet
                          </div>
                        ) : <PostsList /> }
                      </>
                    )}
                  </>
                )}

                {hasErrorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {hasErrorMessage}
                  </div>
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
              { 'Sidebar--open': selectedPost },
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
