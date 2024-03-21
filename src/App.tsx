import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { useEffect } from 'react';
import { PostsList } from './components/PostsList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { usePosts, useUsers } from './context';

export const App: React.FC = () => {
  const { selectedUser } = useUsers();
  // Prettier does it)))
  /* eslint-disable */
  const { posts, isPostsLoading, handleFetchComments, openedPost, postsError } =
    usePosts();
  /* eslint-disable */
  useEffect(() => {
    if (selectedUser) {
      handleFetchComments(selectedUser.id);
    }
  }, [selectedUser]);

  const hasPosts = !!posts.length;

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
                    {isPostsLoading && <Loader />}

                    {!isPostsLoading && postsError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {!isPostsLoading && !hasPosts && !postsError && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {!isPostsLoading && hasPosts && <PostsList />}
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
