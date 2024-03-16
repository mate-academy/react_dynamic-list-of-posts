import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { useEffect } from 'react';
import { usePosts, useUsers } from './context';

export const App: React.FC = () => {
  const { selectedUser, usersError } = useUsers();
  const { posts, isPostsLoading, handleFetchComments, openedPost } = usePosts();

  useEffect(() => {
    if (selectedUser) {
      handleFetchComments(selectedUser.id);
    }
  }, [selectedUser]);

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

                {selectedUser && (
                  <>
                    {isPostsLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {usersError && (
                          <div
                            className="notification is-danger"
                            data-cy="PostsLoadingError"
                          >
                            Something went wrong!
                          </div>
                        )}

                        {!posts.length ? (
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
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': openedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {openedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
