import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';

import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import { PostDetails } from './components/PostDetails/PostDetails';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await client.get<User[]>('/users');

        setUsers(usersData);
      } catch {
        if (users.length) {
          setUsers([]);
        }
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = useCallback((user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  }, []);

  const handlePostSelect = useCallback((post: Post) => {
    setSelectedPost(post);
  }, []);

  const hidePostDetails = useCallback(() => {
    setSelectedPost(null);
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
                  handleUserSelect={handleUserSelect}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser"> No user selected </p>
                ) : (
                  <PostsList
                    handlePostSelect={handlePostSelect}
                    selectedPost={selectedPost}
                    userId={selectedUser.id}
                    hidePostDetails={hidePostDetails}
                  />
                )}
              </div>
            </div>
          </div>

          {selectedPost && (
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
                <PostDetails post={selectedPost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
