import React from 'react';
import cn from 'classnames';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

// import classNames from 'classnames';
import { PostsList } from './components/PostsList';
// import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { useGlobalStateContext } from './components/GlobalStateProvider';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';

export const App: React.FC = () => {
  const { error, userPosts, selectedUser, selectedPost } =
    useGlobalStateContext();
  const [isLoadingPosts, setIsLoadingPosts] = React.useState(false);

  let dataCy, message;

  if (error) {
    dataCy = 'PostsLoadingError';
    message = error;
  } else if (!userPosts.length && selectedUser && !error && !isLoadingPosts) {
    dataCy = 'NoPostsYet';
    message = 'No posts yet';
  }

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector setLoading={setIsLoadingPosts} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {message && (
                  <div
                    className={cn('notification', {
                      'is-danger': error,
                      'is-warning': !userPosts.length && !error,
                    })}
                    data-cy={dataCy}
                  >
                    {message}
                  </div>
                )}

                {!!userPosts.length && <PostsList />}
              </div>
            </div>
          </div>

          {selectedPost && (
            <div
              data-cy="Sidebar"
              className={cn(
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
