import { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';

import { getUsers } from './api/users';

import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const getUsersFromServer = async () => {
      try {
        const usersData = await getUsers();

        setUsersList(usersData);
      } catch (error) {
        throw Error('Unable to load users');
      }
    };

    getUsersFromServer();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  usersList={usersList}
                  userName={selectedUser?.name}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                { !selectedUser
                  ? (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )
                  : (
                    <PostsList
                      selectedUser={selectedUser}
                      selectedPost={selectedPost}
                      setSelectedPost={setSelectedPost}
                    />
                  )}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            { selectedPost && (
              <PostDetails
                selectedPost={selectedPost}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
