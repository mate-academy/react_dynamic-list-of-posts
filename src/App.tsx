import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

// import classNames from 'classnames';
// import { PostsList } from './components/PostsList';
// import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
// import { Loader } from './components/Loader';

import { User } from './types/User';

import { getUsers } from './api/todos';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  const usersGetter = useCallback(() => {
    getUsers()
      .then(setUsers);
    // .catch(setIsGetError);
  }, []);

  useEffect(() => {
    usersGetter();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector usersList={users} />
              </div>

              {/* <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">
                  No user selected
                </p>

                <Loader />

                <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  Something went wrong!
                </div>

                <div className="notification is-warning" data-cy="NoPostsYet">
                  No posts yet
                </div>

                <PostsList />
              </div> */}
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
