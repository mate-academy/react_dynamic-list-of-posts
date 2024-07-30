/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/Post/PostsList';
import { PostDetails } from './components/Post/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

const getUsers = async () => {
  const users = await client.get<User[]>('/users');

  return users;
};

const getPosts = async (id: number) => {
  const posts = await client.get<Post[]>(`/posts?userId=${id}`);

  return posts;
};

const getComments = async (id: number) => {
  const comments = await client.get<Comment[]>(`/comments?postId=${id}`);

  return comments;
};

const deleteComment = async (id: number) => {
  const deletedComment = await client.delete(`/comments/${id}`);

  return deletedComment;
};

const createComment = async (
  postId: number,
  name: string,
  email: string,
  body: string,
) => {
  const createNewComment = await client.post<Comment>('/comments', {
    postId: postId,
    name: name,
    email: email,
    body: body,
  });

  return createNewComment;
};

export const App: React.FC = () => {
  const [usersArray, setUsersArray] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [errorSidebar, setErrorSidebar] = useState<string>('');
  const [chosenUser, setChosenUser] = useState<User | null>(null);
  const [postsArray, setPostsArray] = useState<Post[]>([]);
  const [commentsArray, setCommentsArray] = useState<Comment[]>([]);
  const [chosenPost, setChosenPost] = useState<Post | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoadedSidebar, setIsLoadedSidebar] = useState<boolean>(false);
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);

  const handleClickChooseUser = (user: User) => {
    setChosenUser(user);
  };

  const handleFocusDropmenu = (state: boolean) => {
    setIsFocused(state);
  };

  const handleClickChooseUserPost = (userId: number) => {
    setIsLoaded(true);
    setChosenPost(null);
    setCommentsArray([]);
    getPosts(userId)
      .then(setPostsArray)
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setIsLoaded(false);
      });
  };

  const handleClickChoosePostComments = (postId: number) => {
    setIsLoadedSidebar(true);
    setCommentsArray([]);
    getComments(postId)
      .then(setCommentsArray)
      .catch(() => setErrorSidebar('Something went wrong'))
      .finally(() => {
        setIsLoadedSidebar(false);
      });
  };

  const handleClickOpenPost = (post: Post | null) => {
    setChosenPost(post);
    if (post) {
      handleClickChoosePostComments(post.id);
    }
  };

  const handleClickDeleteComment = (commentId: number) => {
    deleteComment(commentId).then(() =>
      setCommentsArray(prev => prev.filter(com => com.id !== commentId)),
    );
  };

  const handleSubmitNewComment = (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => {
    setIsLoadingForm(true);
    createComment(postId, name, email, body).then(data => {
      setCommentsArray(prev => [...prev, data]);
      setIsLoadingForm(false);
    });
  };

  useEffect(() => {
    getUsers()
      .then(setUsersArray)
      .catch(() => setError('Something went wrong'));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={usersArray}
                  onClick={handleClickChooseUser}
                  chosenUser={chosenUser}
                  isFocused={isFocused}
                  onFocusElement={handleFocusDropmenu}
                  onClickUser={handleClickChooseUserPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isLoaded && <Loader />}

                {chosenUser === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {!!error.length && !postsArray.length && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {!!postsArray.length && !isLoaded && (
                  <PostsList
                    posts={postsArray}
                    chosenPost={chosenPost}
                    onClickPost={handleClickOpenPost}
                  />
                )}

                {chosenUser &&
                  !error.length &&
                  !postsArray.length &&
                  !isLoaded && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
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
              { 'Sidebar--open': chosenPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                chosenPost={chosenPost}
                error={errorSidebar}
                isLoaded={isLoadedSidebar}
                isLoadingForm={isLoadingForm}
                comments={commentsArray}
                onClickDeleteComment={handleClickDeleteComment}
                onSubmitNewComment={handleSubmitNewComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
