import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { getUsers } from './api/users';
import { User } from './types/User';
import { Post } from './types/Post';
import { PostsList } from './components/PostsList';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleSelectUser = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  const handleSelectPost = useCallback((post) => {
    setSelectedPost(post);
  }, []);

  const getUserList = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      throw new Error('Can\'t load users');
    }
  };

  useEffect(() => {
    getUserList();
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
                  selectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                ) : (
                  <PostsList
                    selectedUserId={selectedUser.id}
                    selectedPost={selectedPost}
                    selectPost={handleSelectPost}
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
