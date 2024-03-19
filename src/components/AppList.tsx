import React, { useContext } from 'react';
import classNames from 'classnames';
import { PostsList } from './PostsList';
import { PostDetails } from './PostDetails';
import { UserSelector } from './UserSelector';
import { Loader } from './Loader';
import { ListContext } from './ListContext';

export const AppList: React.FC = () => {
  const context = useContext(ListContext);
  const { selectedUser, errorMessage, posts } = context;
  const { isLoadingPosts, selectedPost } = context;

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
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : (
                  <>
                    {isLoadingPosts ? (
                      <Loader />
                    ) : (
                      <>
                        {errorMessage ? (
                          <div
                            className="notification is-danger"
                            data-cy="PostsLoadingError"
                          >
                            {errorMessage}
                          </div>
                        ) : (
                          <>
                            {posts.length === 0 ? (
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
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
