import classNames from 'classnames';

import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(usersFromServer => {
        setUsers(usersFromServer);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to load users', error);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === 0 && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUserId > 0 && (
                  <PostsList
                    selectedUserId={selectedUserId}
                    selectedPost={selectedPost}
                    onPostSelect={setSelectedPost}
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
