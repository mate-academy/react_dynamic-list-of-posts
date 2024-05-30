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
import { Error } from './types/Error';
import { Comment } from './types/Comment';
import {
  addComments,
  deleteComments,
  getComments,
  getUsers,
  getPosts,
} from './utils/fetchClient';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [chosenUser, setChosenUser] = useState<User | null>(null);
  const [chosenPost, setChosenPost] = useState<Post | null>(null);
  const [usersPosts, setUsersPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isShowingForm, setIsShowingForm] = useState<boolean>(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    setChosenPost(null);
  }, [chosenUser]);

  useEffect(() => {
    setIsShowingForm(false);
    setIsLoadingComments(true);

    if (chosenPost) {
      getComments(chosenPost.id)
        .then(setComments)
        .catch(() => setError(Error.CommentsError))
        .finally(() => setIsLoadingComments(false));
    }
  }, [chosenPost]);

  useEffect(() => {
    if (chosenUser) {
      setIsLoadingPosts(true);

      getPosts(chosenUser.id)
        .then(setUsersPosts)
        .catch(() => setError(Error.CannotLoadPosts))
        .finally(() => setIsLoadingPosts(false));
    }
  }, [chosenUser]);

  const handleCommentFormSubmission = (
    postId: Post['id'],
    authorName: string,
    authorEmail: string,
    commentBody: string,
  ) => {
    setIsSubmittingForm(true);

    if (
      !authorName.trim().length ||
      !authorEmail.trim().length ||
      !commentBody.trim().length
    ) {
      setIsSubmittingForm(false);

      return;
    }

    const newId = +new Date();

    const newComment: Comment = {
      id: newId,
      postId: postId,
      name: authorName.trim(),
      email: authorEmail.trim(),
      body: commentBody.trim(),
    };

    addComments(postId, authorName, authorEmail, commentBody)
      .then(() =>
        setComments(
          (currentComments: Comment[]) =>
            [...currentComments, newComment] as Comment[],
        ),
      )
      .catch(() => setError(Error.CommentsError))
      .finally(() => setIsSubmittingForm(false));
  };

  const handleDeleteComment = (commentId: Comment['id']) => {
    deleteComments(commentId);

    setComments((currentComments: Comment[]) =>
      currentComments.filter(
        (currentComment: Comment) => currentComment.id !== commentId,
      ),
    );
  };

  const showNoPostsMessage =
    !error && !isLoadingPosts && chosenUser && !usersPosts.length;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  chosenUser={chosenUser}
                  setChosenUser={setChosenUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!chosenUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPostsMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!usersPosts.length && !isLoadingPosts && (
                  <PostsList
                    posts={usersPosts}
                    chosenPost={chosenPost}
                    handlePostChange={setChosenPost}
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
              { 'Sidebar--open': chosenPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {chosenPost && (
                <PostDetails
                  post={chosenPost}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  error={error}
                  isShowingForm={isShowingForm}
                  handleShowForm={setIsShowingForm}
                  isSubmittingForm={isSubmittingForm}
                  handleIsSubmittingForm={setIsSubmittingForm}
                  handleCommentFormSubmission={handleCommentFormSubmission}
                  handleDeleteComment={handleDeleteComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
