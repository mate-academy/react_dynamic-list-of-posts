import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useUsers } from './hooks/useUsers';
import { usePosts } from './hooks/usePosts';
import { useState } from 'react';

export const App: React.FC = () => {
  const [isFormShown, setIsFormShown] = useState(false);

  const { users, currentUser, setCurrentUser } = useUsers();

  const { posts, currentPost, setCurrentPost, isPostsLoading, isPostsError } =
    usePosts(currentUser?.id || null);

  const isPostsBlockShown = currentUser && !isPostsError && !isPostsLoading;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setCurrentPost={setCurrentPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currentUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsLoading && <Loader />}

                {isPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isPostsBlockShown &&
                  (!posts.length ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={posts}
                      currentPost={currentPost}
                      setCurrentPost={setCurrentPost}
                      setIsShowForm={setIsFormShown}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': !!currentPost,
            })}
          >
            {currentPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  currentPost={currentPost}
                  isShowForm={isFormShown}
                  setIsShowForm={setIsFormShown}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
