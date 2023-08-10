import React from 'react';
import { Comment } from '../../types/Comment';
// import { client } from '../../utils/fetchClient';
// import { ErrorMessage } from '../../types/ErrorMessage';

interface Props {
  comments: Comment[];
  setCommentIdToDelete: (value: number) => void;
  // setErrorMessage: (message: ErrorMessage) => void;
}

export const CommentsList: React.FC<Props> = ({
  comments,
  setCommentIdToDelete,
  // setErrorMessage,
}) => {
  // const deleteComment = (commentId: number) => {
  //   client.delete(`/comments/${commentId}`)
  //     .then(() => setCommentIdToDelete(commentId))
  //     .catch(() => setErrorMessage(ErrorMessage.Delete));
  // };

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
            <a
              href={`mailto:${comment.email}`}
              data-cy="CommentAuthor"
            >
              {comment.name}
            </a>
            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
              onClick={() => setCommentIdToDelete(comment.id)}
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
