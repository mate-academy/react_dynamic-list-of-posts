import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { Post } from './types/Post';
import { getPostsData, getUsersData } from './api/api';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [createNewComment, setCreateNewComment] = useState<boolean>(false);

  useEffect(() => {
    getUsersData()
      .then(setUsers)
      .catch(() => setErrorMessage(true));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoader(true);
      setErrorMessage(false);

      getPostsData(selectedUser.id)
        .then(setUserPosts)
        .catch(() => setErrorMessage(true))
        .finally(() => setLoader(false));
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
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                { loader && (
                  <Loader />
                )}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {
                  (selectedUser && userPosts.length === 0
                    && !errorMessage && !loader) && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )
                }

                {selectedUser && userPosts.length > 0 && (
                  <PostsList
                    userPosts={userPosts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setCreateNewComment={setCreateNewComment}
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">

                <PostDetails
                  selectedPost={selectedPost}
                  createNewComment={createNewComment}
                  setCreateNewComment={setCreateNewComment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
