/* eslint-disable prettier/prettier */

import { Loader } from '../Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../../types/interfaces';
import { PostComment } from './PostComment';
import { ErrorMessages } from '../../types/ErrorMessages';
import { useComments } from '../../hooks/useComments';
import React, { useState } from 'react';

type Props = {
  selectedPost: Post | null;
  currentError: ErrorMessages | null;
  setCurrentError: React.Dispatch<React.SetStateAction<ErrorMessages | null>>;
  setIsOpenCommentForm: React.Dispatch<React.SetStateAction<boolean>>
  isOpenCommentForm:boolean,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  currentError,
  setCurrentError,
  setIsOpenCommentForm,
  isOpenCommentForm,
}) => {
  const [inputForm, setInputForm] = useState({
    name: '',
    email: '',
    body: '',
  });

  const {
    comments,
    isLoadingComments,
    isLoadingAdd,
    handleAddComment,
    handleDeleteComment,
  } = useComments(selectedPost, setCurrentError, inputForm, setInputForm);

  const toggleCommentForm = () => {
    setIsOpenCommentForm(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        {currentError === ErrorMessages.PostsLoadingError ? (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        ) : isLoadingComments ? (
          <Loader />
        ) : (
          <div className="block">
            {comments.length === 0 && currentError === null ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <p className="title is-4">Comments:</p>
            )}

            {comments.map(comment => {
              return (
                <PostComment
                  key={comment.id}
                  comment={comment}
                  handleDeleteComment={handleDeleteComment}
                />
              );
            })}

            {!isOpenCommentForm ? (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => toggleCommentForm()}
              >
                Write a comment
              </button>
            ) : (
              <NewCommentForm
                inputForm={inputForm}
                setInputForm={setInputForm}
                handleAddComment={handleAddComment}
                isLoadingAdd={isLoadingAdd}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
