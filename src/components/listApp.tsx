import React, { useContext } from 'react';
import { UserSelector } from './UserSelector';
import { Loader } from './Loader';
import { PostsList } from './PostsList';
import classNames from 'classnames';
import { PostDetails } from './PostDetails';
import { UserListContext } from './listContext';

export const ListApp: React.FC = () => {
  const { users, isLoader, error, post, detail } = useContext(UserListContext);

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
                {!users.length && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoader && <Loader />}
                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {post.length === 0 && users.length > 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                <PostsList />
              </div>
            </div>
          </div>
          {detail && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
