import React from 'react';
import { Comment } from '../types/Comment';
import { ErrorMessage } from '../types/errors';
import { deleteComment } from '../api/comments';

interface Props {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessage | null>>;
}

export const CommentsList: React.FC<Props> = ({
  comments,
  setComments,
  setErrorMessage,
}) => {
  const handleDeleteComment = async (commentId: number) => {
    try {
      setComments(prevComments => prevComments
        .filter(({ id }) => id !== commentId));
      await deleteComment(commentId);
    } catch (error) {
      setErrorMessage(ErrorMessage.DELETE);
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
          <div className="message-header">
            <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
              {comment.name}
            </a>
            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
              onClick={() => handleDeleteComment(comment.id)}
            >
              delete button
            </button>
          </div>

          <div className="message-body" data-cy="CommentBody">
            {comment.body}
          </div>
        </article>
      ))}
    </>
  );
};
