import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import * as service from './utils/api';
import { User } from './types/User';
import { PostDetails } from './components/PostDetails';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userComments, setUserComments] = useState<Comment[]>([]);

  const [isChooseUser, setIsChooseUser] = useState<number | null>(null);
  const [isOpenComment, setIsOpenComment] = useState<number | null>(null);

  const [isChoose, setIsChoose] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [isErrorComment, setIsErrorComment] = useState(false);
  const [userPostElement, setUserPostElement] = useState<Post | {}>({});

  useEffect(() => {
    setIsError(false);
  }, [userPosts]);

  const notPostYet = userPosts.length === 0
  && isChooseUser
  && !isLoading;

  const removeComments = async (postId: number) => {
    try {
      await service.getDeleteComment(postId);

      const removeItem = userComments.filter(comment => comment.id !== postId);

      setUserComments(removeItem);
    } catch {
      setIsError(true);
    }
  };

  const handleClickOpenComments = async (postId: number) => {
    const foundPost = userPosts?.find(post => post.id === postId);

    if (foundPost) {
      setUserPostElement(foundPost);
      try {
        setIsCommentsLoading(true);

        const commentsFromServer = await service.getComment(postId);

        setUserComments(commentsFromServer);
        setIsOpenComment(prevState => (prevState === postId ? null : postId));
        setIsCommentsLoading(false);
      } catch {
        setIsErrorComment(true);
      }
    }
  };

  const handleChooseUser = () => {
    setIsChoose(!isChoose);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const usersFromServer = await service.getUsers();

        setUsers(usersFromServer);
        setIsError(false);
        setIsLoading(false);
      } catch (usersError) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setIsLoading={setIsLoading}
                  setIsError={setIsError}
                  setUserPosts={setUserPosts}
                  setIsChoose={setIsChoose}
                  users={users}
                  handleChooseUser={handleChooseUser}
                  isChoose={isChoose}
                  setIsChooseUser={setIsChooseUser}
                  setIsOpenComment={setIsOpenComment}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!isChooseUser && !isLoading && (
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

                {notPostYet
                && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>

                )}

                {userPosts.length > 0 && (
                  <PostsList
                    userPostElement={userPostElement}
                    handleClickOpenComments={handleClickOpenComments}
                    userPosts={userPosts}
                  />
                )}
              </div>
            </div>
          </div>

          {isOpenComment && (
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
                  userPostElement={userPostElement}
                  removeComments={removeComments}
                  isErrorComment={isErrorComment}
                  setIsErrorComment={setIsErrorComment}
                  isCommentsLoading={isCommentsLoading}
                  userComments={userComments}
                  setUserComments={setUserComments}
                  isOpenComment={isOpenComment}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
