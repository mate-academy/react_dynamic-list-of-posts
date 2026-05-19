import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { PostContext } from './components/PostContext';
import React from 'react';
import { Loader } from './components/Loader';
// import { Loader } from './components/Loader';

export const App = () => {
  const { user, postList, post, userLoading, userError, openDetails } =
    React.useContext(PostContext)!;

  const [showNoPosts, setShowNoPosts] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (user && !userLoading && !postList.length) {
      timer = setTimeout(() => setShowNoPosts(true), 300);
    } else {
      setShowNoPosts(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [user, userLoading, postList.length]);

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
                {!user && <p data-cy="NoSelectedUser">No user selected</p>}

                {userLoading && <Loader />}

                {userError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {user && postList.length > 0 && <PostsList />}
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
              { 'Sidebar--open': openDetails },
            )}
          >
            {post && (
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
