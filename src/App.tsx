import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { Store } from './store';

export const App: React.FC = () => {
  const {
    setUsers, selectedUser, posts, isPostsLoading, showSidebar,
  }
    = Store();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    client
      .get('/users')
      .then((res) => {
        if (Array.isArray(res)) {
          setUsers(res);
        } else {
          throw res;
        }
      })
      .catch((error) => {
        setIsError(true);
        Error(error.message);
      });
  }, []);

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
                {!selectedUser.name && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isPostsLoading && <Loader />}
                {!isPostsLoading && posts?.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts && posts?.length > 0 && <PostsList />}
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
                'Sidebar--open': showSidebar >= 0,
              },
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

export default App;
