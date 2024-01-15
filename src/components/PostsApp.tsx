import React, { useContext } from 'react';
import classNames from 'classnames';

import { UsersContext } from './Users/UserContext';
import { PostsContext } from './Posts/PostContext';

import { UserSelector } from './Users/UserSelector';
import { Loader } from './Loader';
import { PostsList } from './Posts/PostsList';
import { PostDetails } from './Posts/PostDetails';
import { MainContentType } from '../types/MainContentType';

export const PostsApp: React.FC = () => {
  const { selectedPost } = useContext(PostsContext);
  const { mainContent } = useContext(UsersContext);

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
                {mainContent === MainContentType.NoSelectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {mainContent === MainContentType.Loader && (
                  <Loader />
                )}

                {mainContent === MainContentType.PostsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {mainContent === MainContentType.NoPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {mainContent === MainContentType.PostsList && (
                  <PostsList />
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
