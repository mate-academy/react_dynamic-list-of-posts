import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { getUsers } from './api/users';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const onLoadGetUsers = async () => {
      try {
        const allUsers = await getUsers();

        setUsers(allUsers);
      } catch (error) {
        throw Error('Unable to load users');
      }
    };

    onLoadGetUsers();
  }, []);

  const handleSelectUser = useCallback((user: User | null) => {
    setSelectedUser(user);
  }, []);

  const handleSelectPost = useCallback((post: Post | null) => {
    setSelectedPost(post);
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
                  selectedUser={selectedUser}
                  onSelectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser
                  ? (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )
                  : (
                    <PostsList
                      selectedUser={selectedUser}
                      selectedPost={selectedPost}
                      onSelectPost={handleSelectPost}
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
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails selectedPost={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
