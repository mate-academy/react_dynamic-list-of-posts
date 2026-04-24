import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useContext, useEffect } from 'react';
import { getUsers } from './api';
import { UsersContext } from './store/UsersProvider';
import { PostsContext } from './store/PostsProvider';
import { UserContext } from './store/UserProvider';
import { PostContext } from './store/PostProvider';

export const App = () => {
  const { setUsers } = useContext(UsersContext);
  const { user } = useContext(UserContext);
  const { posts, postsStatus } = useContext(PostsContext);
  const { post } = useContext(PostContext);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getUsers();

        if (!response) {
          throw new Error('Error 404');
        }

        setUsers(response);
      } catch (err) {}
    };

    loadUsers();
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
                {!user && <p data-cy="NoSelectedUser">No user selected</p>}

                {postsStatus === 'loading' && <Loader />}
                {postsStatus === 'error' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {postsStatus === 'success' &&
                  (posts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList />
                  ))}
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
                ['Sidebar--open']: post,
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
