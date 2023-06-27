import React from 'react';
import { ErrorType } from '../types/ErrorType';
import { customFetch } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { CommentInfo } from './CommentInfo';

type Props = {
  comments: Comment[];
  setErrorType: React.Dispatch<React.SetStateAction<ErrorType | null>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const CommentsList: React.FC<Props> = ({
  comments,
  setComments,
  setErrorType,
}) => {
  const handleDeleteComment = async (commentId: number) => {
    try {
      setComments(prevComments => prevComments
        .filter(({ id }) => id !== commentId));
      await customFetch.removeComment(commentId);
    } catch (error) {
      setErrorType(ErrorType.DELETE);
    }
  };

  if (!comments.length) {
    return (
      <p className="title is-4" data-cy="NoCommentsMessage">
        No comments yet
      </p>
    );
  }

  return (
    <>
      <p className="title is-4">Comments:</p>
      {comments.map(comment => (
        <article
          key={comment.id}
          className="message is-small"
          data-cy="Comment"
        >
          <CommentInfo
            comment={comment}
            onDeleteComment={handleDeleteComment}
          />
        </article>
      ))}
    </>
  );
};
