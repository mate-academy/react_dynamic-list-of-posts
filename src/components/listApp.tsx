import React, { useContext } from 'react';
import { UserSelector } from './UserSelector';
import { Loader } from './Loader';
import { PostsList } from './PostsList';
import classNames from 'classnames';
import { PostDetails } from './PostDetails';
import { UserListContext } from './listContext';

export const ListApp: React.FC = () => {
  const { isLoader, errorPosts, detail, post, selectedUser, loaderDetails } =
    useContext(UserListContext);
  // const userNames = users.find(nam => nam.id);

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
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoader && <Loader />}
                {errorPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {!post.length && selectedUser && !errorPosts && !isLoader && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {!isLoader && <PostsList />}
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
              { 'Sidebar--open': detail },
            )}
          >
            <div className="tile is-child box is-success ">
              {loaderDetails && <Loader />}
              {loaderDetails && selectedUser && post.length > 0 && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
