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
import {
  getPostsFromServer,
  getUsersFromServer,
} from './utils/helperFunctions';

export const App: React.FC = () => {
  const [listOfUsers, setListOfUsers] = useState<User[]>([]);
  const [listsOfPosts, setListsOfPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [typeOfError, setTypeOfError] = useState<ErrorType>(ErrorType.none);
  const [isLoading, setIsLoading] = useState(false);

  const chooseUser = (user: User) => setSelectedUser(user);

  useEffect(() => {
    getUsersFromServer()
      .then(usersApi => {
        setListOfUsers(usersApi);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      setTypeOfError(ErrorType.none);

      getPostsFromServer(selectedUser.id)
        .then(postsFromSever => {
          setListsOfPosts(postsFromSever);
          if (!postsFromSever.length) {
            setTypeOfError(ErrorType.noPosts);
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

                {isLoading && <Loader />}

                {typeOfError && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && (
                  <PostsList
                    posts={listsOfPosts}
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
                {/* {selectedPost && (
                  <PostDetails
                    selectedPost={selectedPost}
                  />
                )} */}
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
