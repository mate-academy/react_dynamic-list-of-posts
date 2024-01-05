import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector';
import { useAppContext } from './context/AppContext';
import { PostsList } from './components/PostsList';

export const App: React.FC = () => {
  const { selectedUser } = useAppContext();

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

                {/* <Loader /> */}

                {/* <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  Something went wrong!
                </div> */}

                {/* <div className="notification is-warning" data-cy="NoPostsYet">
                  No posts yet
                </div> */}

                {
                  selectedUser
                    ? <PostsList />
                    : (
                      <p data-cy="NoSelectedUser">
                        No user selected
                      </p>
                    )
                }

              </div>
            </div>
          </div>

          {/* <div
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
          </div> */}
        </div>
      </div>
    </main>
  );
};
