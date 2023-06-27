import React, { useEffect, useMemo, useState } from 'react';
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
import { getUsers } from './api/users';
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [usersFromServer, setUsersFromServer] = useState<User[] | null>([]);
  const [postsFromServer, setPostsFromServer] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoader, setIsLoader] = useState(false);

  // const [isErrorMessage, setIsErrorMessage] = useState(false);
  // const [errorMessageName, setErrorMessageName] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const [isShowPostDetails, setIsShowPostDetails] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>(0);

  const selectedPost = useMemo(() => postsFromServer
    .find((post) => post.id === postId),
  [postId]);

  const handleSelectedPost = (id: number) => {
    if (postId !== id) {
      setIsShowPostDetails(true);
      setPostId(id);
    } else {
      setIsShowPostDetails(false);
      setPostId(0);
    }
  };

  useEffect(() => {
    getUsers()
      .then(setUsersFromServer);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoader(true);
      getPosts(selectedUser.id)
        .then(setPostsFromServer)
        .then(() => {
          setIsShowPostDetails(false);
          setPostId(0);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoader(false);
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
                  users={usersFromServer}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoader && (
                  <Loader />
                )}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    `Unable to load posts`
                  </div>
                )}
                {selectedUser && (
                  !postsFromServer.length ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={postsFromServer}
                      onSelectedPost={handleSelectedPost}
                      postId={postId}
                    />
                  )
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
                'Sidebar--open': isShowPostDetails,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                selectedPost={selectedPost}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
