import React, { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentItem } from './CommentItem';
import {
  addComments,
  getComments,
  removeComments,
} from '../api/CommentsService';
import { ErrorValues } from '../types/ErrorValues';

type Props = {
  isPostOpen: Post | null,
  setErrorMessage: (message: ErrorValues | null) => void
  errorMessage: ErrorValues | null,
};

export const PostDetails: React.FC<Props> = ({
  isPostOpen,
  setErrorMessage,
  errorMessage,
}) => {
  const [openNewCommentForm, setOpenNewCommentForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [commentsForView, setCommentsForView] = useState<Comment[] | []>([]);

  const handleWriteNewComment = () => {
    setOpenNewCommentForm(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isPostOpen) {
      setIsLoading(true);
      setOpenNewCommentForm(false);
      getComments(isPostOpen?.id)
        .then(setCommentsForView)
        .catch(() => setErrorMessage(ErrorValues.CommentsError))
        .finally(() => setIsLoading(false));
    }
  }, [isPostOpen]);

  const handleRemoveComment = (id: number) => {
    setErrorMessage(null);

    removeComments(id)
      .then(() => setCommentsForView(prevComments => prevComments
        .filter(comment => comment.id !== id)))
      .catch(() => setErrorMessage(ErrorValues.DeletingComment))
      .finally(() => setErrorMessage(null));
  };

  const handleAddingComment = (
    name: string,
    email: string,
    body: string,
  ) => {
    const newComment = {
      postId: isPostOpen?.id,
      name,
      email,
      body,
    };

    setIsLoadingButton(true);
    // setErrorMessage(null);

    addComments(newComment)
      .then((res) => setCommentsForView(prevComments => [...prevComments, res]))
      .catch(() => setErrorMessage(ErrorValues.AddingComment))
      .finally(() => {
        setIsLoadingButton(false);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        {isPostOpen && (
          <h2 data-cy="PostTitle">
            {`#${isPostOpen?.id}: ${isPostOpen?.title}`}
          </h2>
        )}

        <p data-cy="PostBody">
          {isPostOpen?.body}
        </p>
      </div>
      {isLoading
        ? <Loader />
        : (
          <div className="block">
            {commentsForView.length <= 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {
                  commentsForView.map(comment => (
                    <CommentItem
                      comment={comment}
                      key={comment.id}
                      handleRemoveComment={handleRemoveComment}
                    />
                  ))
                }
              </>
            )}
            {!openNewCommentForm && !errorMessage && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={handleWriteNewComment}
              >
                Write a comment
              </button>
            )}
          </div>
        )}
      {openNewCommentForm
        && (
          <NewCommentForm
            handleAddingComment={handleAddingComment}
            isLoadingButton={isLoadingButton}
          />
        )}

      {errorMessage && (
        <div className="notification is-danger" data-cy="CommentsError">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
