import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import classNames from 'classnames';
import { PostsList } from './components/PostList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { User } from './types/User';
import { getUsers } from './utils/fetch_Users';
import './App.scss';

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [usersLoadingError, setUsersLoadingError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    getUsers()
      .then(usersFromApi => setUsers(usersFromApi))
      .catch(() => setUsersLoadingError('Something went wrong!'));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setIsStarted={setIsStarted}
                  users={users}
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                  selectedPostId={selectedPostId}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!isStarted
                  && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )}

                {usersLoadingError
               && (
                 <div
                   className="notification is-danger"
                   data-cy="UsersLoadingError"
                 >
                   {usersLoadingError}
                 </div>
               )}

                {isStarted
                && (
                  <PostsList
                    selectedPostId={selectedPostId}
                    setSelectedPostId={setSelectedPostId}
                    selectedUserId={selectedUserId}
                  />
                )}
              </div>
            </div>
          </div>
          {selectedPostId
          && (
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
                <PostDetails
                  selectedPostId={selectedPostId}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
