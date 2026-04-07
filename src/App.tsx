import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useContext, useEffect, useState } from 'react';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { PostsContext } from './context/PostsContext';

export const App = () => {
  const { filteredPosts, selectedUser, isLoading, error, selectedPost } =
    useContext(PostsContext);

  const showNoPostsMessage =
    !isLoading && !error && selectedUser && filteredPosts.length === 0;

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    client.get<User[]>('/users').then(fetchedUsers => {
      setUsers(fetchedUsers);
    });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}
                {showNoPostsMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {filteredPosts.length > 0 && <PostsList />}
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
              <PostDetails post={selectedPost} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
