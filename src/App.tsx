/* eslint-disable no-console */
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
import { User } from './types/User';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(-1);
  const [users, setUsers] = useState<User[] | null>(null);
  const [isErrorShown, setIsErrorShown] = useState(false);

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      try {
        const data: User[] = await client.get('/users');

        setUsers(data);
      } catch (error) {
        setIsErrorShown(true);
      }
    };

    getUsers();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {users && (
                  <UserSelector
                    users={users}
                    selectedUserId={selectedUserId}
                    setSelectedUserId={setSelectedUserId}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId !== -1 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                <Loader />

                {isErrorShown && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                <div className="notification is-warning" data-cy="NoPostsYet">
                  No posts yet
                </div>

                <PostsList />
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
              'Sidebar--open',
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
