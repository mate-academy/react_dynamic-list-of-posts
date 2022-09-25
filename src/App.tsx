import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import classNames from 'classnames';
import { PostsList } from './components/PostList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './utils/fetch_Users';
import './App.scss';

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [usersLoadingError, setUsersLoadingError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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
                  selectedPost={selectedPost}
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
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    selectedUserId={selectedUserId}
                  />
                )}
              </div>
            </div>
          </div>
          {selectedPost
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
                  selectedPost={selectedPost}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
