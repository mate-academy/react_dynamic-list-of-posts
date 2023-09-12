import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [usersPosts, setUsersPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isCommentButtonClicked, setIsCommentButtonClicked] = useState(false);

  const getAllUsers = () => {
    return client.get<User[]>('/users')
      .catch(() => {
        setErrorMessage('Something went wrong!');
      });
  };

  useEffect(() => {
    getAllUsers()
      .then(usersFromServer => {
        if (usersFromServer) {
          setUsers(usersFromServer);
        }
      });
  }, []);

  const getUsersPosts = () => {
    return client.get<Post[]>(`/posts?userId=${selectedUser?.id}`)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      });
  };

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      getUsersPosts()
        .then(postsFromServer => {
          if (postsFromServer) {
            setUsersPosts(postsFromServer);
          }
        })
        .finally(() => setIsLoading(false));
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
                  setIsDropDownActive={setIsDropDownActive}
                  isDropDownActive={isDropDownActive}
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {(!usersPosts.length
                && selectedUser
                && !errorMessage
                && !isLoading
                && !isDropDownActive
                ) && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {(usersPosts.length > 0
                && selectedUser
                && !isLoading
                ) && (
                  <PostsList
                    usersPosts={usersPosts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setIsCommentButtonClicked={setIsCommentButtonClicked}
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
            {selectedPost !== null && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  isCommentButtonClicked={isCommentButtonClicked}
                  setIsCommentButtonClicked={setIsCommentButtonClicked}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
