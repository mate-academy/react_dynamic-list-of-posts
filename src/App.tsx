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
import { Post } from './types/Post';
import { ErrorType } from './types/ErrorType';
import { getPostsFromServer } from './api/posts';
import { getUsersFromServer } from './api/users';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [typeOfError, setTypeOfError] = useState<ErrorType>(ErrorType.None);
  const [isLoading, setIsLoading] = useState(false);

  const saveSelectedUser = (user: User) => setSelectedUser(user);

  useEffect(() => {
    getUsersFromServer()
      .then(usersApi => {
        setUsers(usersApi);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      setTypeOfError(ErrorType.None);

      getPostsFromServer(selectedUser.id)
        .then(postsFromSever => {
          setPosts(postsFromSever);
          if (!postsFromSever.length) {
            setTypeOfError(ErrorType.NoPosts);
          }
        })
        .finally(() => {
          setIsLoading(false);
          setSelectedPost(null);
        });
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  saveSelectedUser={saveSelectedUser}
                  choosenUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser ? null : (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {typeOfError && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && (
                  <PostsList
                    posts={posts}
                    onSelectPost={setSelectedPost}
                    selectedPost={selectedPost}
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
