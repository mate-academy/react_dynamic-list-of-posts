/* eslint-disable func-names */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/bulma.sass';
import './App.scss';

import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { getPosts, getUsers } from './utils/api';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const setSelectedUser = (selectedUser: User) => setUser(selectedUser);
  const getData = async (userId?: number) => (
    userId
      ? setPosts(await getPosts(userId))
      : setUsers(await getUsers())
  );

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData(user?.id);
  }, [user]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={user}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">
                  {`${user?.name || 'No user selected'}`}
                </p>

                <Loader />

                <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  Something went wrong!
                </div>

                <div className="notification is-warning" data-cy="NoPostsYet">
                  No posts yet
                </div>

                <PostsList posts={posts} />
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
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
