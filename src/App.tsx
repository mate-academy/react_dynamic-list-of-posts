import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

const usersFromServer = () => client.get<User[]>('/users');
const postsFromServer = (userID: number) => client.get<Post[]>(`/posts?userId=${userID}`);

export const App: React.FC = () => {
  const [listOfUsers, setListOfUsers] = useState<User[]>([]);
  const [listsOfPosts, setListsOfPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const chooseUser = (user: User) => setSelectedUser(user);

  useEffect(() => {
    usersFromServer()
      .then(usersApi => {
        setListOfUsers(usersApi);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      postsFromServer(selectedUser?.id)
        .then(postsFromSever => {
          setListsOfPosts(postsFromSever);
        });
    }
  });

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  listOfUserf={listOfUsers}
                  saveSelectedUser={chooseUser}
                  choosenUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser ? null : (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

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

                <PostsList
                  posts={listsOfPosts}
                />
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
