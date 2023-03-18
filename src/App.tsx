import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { getUsers } from './api/user';
import { getPosts } from './api/post';
import { getComments } from './api/coment';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);
  const [isErrorSideBar, setIsErrorSideBar] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSidebar, setIsLoadingSidebar] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [openedPost, setOpenedPost] = useState<Post | null>(null);
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [isEmptyPostMessage, setIsEmptyPostMessage] = useState(false);

  const setUsersList = useMemo(() => () => {
    getUsers()
      .then((data) => {
        setUsers(data);
        setIsError('error' in data);
      })
      .catch(() => setIsError(true));
  }, []);

  const setUsersPost = (user: User) => {
    if (user) {
      setIsLoading(true);
      setPosts([]);

      getPosts(user.id)
        .then((data) => {
          setPosts(data);
          setIsError('error' in data);
          setIsEmptyPostMessage(data.length === 0);
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  };

  const setCommentsList = (postId: number) => {
    if (openedPost?.id === postId) {
      return;
    }

    setIsLoadingSidebar(true);
    getComments(postId)
      .then((data) => {
        setComments(data);
        setIsErrorSideBar('error' in data);
      })
      .catch(() => setIsErrorSideBar(true))
      .finally(() => setIsLoadingSidebar(false));
  };

  useEffect(() => {
    setUsersList();
  }, [setUsersList]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  users={users}
                  setUsersPost={setUsersPost}
                  setOpenedPost={setOpenedPost}
                />
              </div>

              <div
                className="block"
                data-cy="MainContent"
              >
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && (
                  <Loader />
                )}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {isEmptyPostMessage && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}
                {posts.length > 0 && (
                  <PostsList
                    openedPost={openedPost}
                    setOpenedPost={setOpenedPost}
                    posts={posts}
                    setCommentsList={setCommentsList}
                    setIsVisibleForm={setIsVisibleForm}
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
              `Sidebar--${openedPost ? 'open' : 'close'}`,
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                setIsErrorSide={setIsErrorSideBar}
                openedPost={openedPost}
                isErrorSide={isErrorSideBar}
                isLoadingSidebar={isLoadingSidebar}
                comments={comments}
                setComments={setComments}
                isVisibleForm={isVisibleForm}
                setIsVisibleForm={setIsVisibleForm}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
