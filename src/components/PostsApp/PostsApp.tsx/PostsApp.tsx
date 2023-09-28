import classNames from 'classnames';
import React from 'react';
import { usePosts } from '../../../PostsContext';
import { Loader } from '../../Loader';
import { PostDetails } from '../../PostDetails';
import { PostsList } from '../../PostsList';
import { UserSelector } from '../../UserSelector';

export const PostsApp: React.FC = () => {
  const {
    isLoading,
    hasError,
    selectedUser,
    selectedPost,
  } = usePosts();

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
                {!selectedUser && !isLoading && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && (<Loader />)}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser && (!isLoading) && (<PostsList />)}
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
