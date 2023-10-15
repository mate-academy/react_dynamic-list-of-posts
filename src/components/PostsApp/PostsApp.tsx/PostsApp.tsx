import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { usePosts } from '../../../PostsContext';
import { Loader } from '../../Loader';
import { PostDetails } from '../../PostDetails/PostDetails';
import { PostsList } from '../../PostsList/PostsList';
import { UserSelector } from '../../UserSelector/UserSelector';
import { Errors } from '../../../types/Errors';
import { getUsers } from '../../../api/posts';
import { User } from '../../../types/User';

export const PostsApp: React.FC = () => {
  const {
    loadingPosts,
    errorMessage,
    setErrorMessage,
    removeError,
    selectedUser,
    selectedPost,
  } = usePosts();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setErrorMessage(Errors.loadingUsers);
        removeError();
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} />
              </div>

              <div
                className="block"
                data-cy="MainContent"
              >
                {!selectedUser && !loadingPosts && !errorMessage && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loadingPosts && (<Loader />)}

                {errorMessage === Errors.loadingUsers && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {Errors.loadingUsers}
                  </div>
                )}

                {selectedUser && (!loadingPosts) && (<PostsList />)}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': selectedPost,
            })}
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
