import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../../TodoContext';
import { UserSelector } from '../UserSelector';
import { Loader } from '../Loader';
import { PostsList } from '../PostList';
import { Errors } from '../../types/Errors';
import { PostDetails } from '../PostDetails';

export const TodoApp: React.FC = () => {
  const {
    selectedUser,
    isLoading,
    errorMessage,
    userPosts,
    selectedPost,
  } = useContext(TodosContext);

console.log(isLoading)

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>
              {isLoading && (
                <Loader />
              )}

              {selectedUser && userPosts.length > 0 && (
                <PostsList />
              )}

              {(selectedUser && userPosts.length === 0
              && !errorMessage && !isLoading) && (
                <div className="notification is-warning" data-cy="NoPostsYet">
                  {Errors.NoPostsYet}
                </div>
              )}

              {errorMessage && (
                <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  {Errors.SomethingWrong}
                </div>
              )}
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
                'Sidebar--open': selectedPost,
              },
            )}
          >
            {selectedPost && (
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
