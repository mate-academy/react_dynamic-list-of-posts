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

  const [userPostElement, setUserPostElement] = useState<Post | null>(null);
  const [isChooseUser, setIsChooseUser] = useState<number | null>(null);
  const [isOpenComment, setIsOpenComment] = useState<number | null>(null);

  const [isChoose, setIsChoose] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [isErrorComment, setIsErrorComment] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [userPosts]);

  const notPostYet = !isError
  && userPosts.length === 0
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

  const handleToggleCommentsClick = async (postId: number) => {
    const foundPost = userPosts?.find(post => post.id === postId);

    setIsOpenComment(prevState => (prevState === postId ? null : postId));
    if (foundPost) {
      setUserPostElement(foundPost);

      try {
        setIsCommentsLoading(true);
        const commentsFromServer = await service.getComment(postId);

        setUserComments(commentsFromServer);
      } catch {
        setIsErrorComment(true);
      } finally {
        setIsCommentsLoading(false);
      }
    }

    if (userPostElement?.id === postId) {
      setUserPostElement(null);
    }
  };

  const handleChooseUser = () => {
    setIsChoose(!isChoose);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersFromServer = await service.getUsers();

        setUsers(usersFromServer);
        setIsError(false);
      } catch (usersError) {
        setIsError(true);
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
                  setUserPosts={(user: Post[]) : void => {
                    setUserPosts(user);
                    setUserPostElement(null);
                  }}
                  setIsChoose={setIsChoose}
                  users={users}
                  handleChooseUser={handleChooseUser}
                  isChoose={isChoose}
                  setIsChooseUser={setIsChooseUser}
                  setIsOpenComment={setIsOpenComment}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isChooseUser === null && (
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

                {userPosts.length > 0 && !isError && (
                  <PostsList
                    userPostElement={userPostElement}
                    handleToggleCommentsClick={handleToggleCommentsClick}
                    userPosts={userPosts}
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
              { 'Sidebar--open': isOpenComment },
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
        </div>
      </div>
    </main>
  );
};
