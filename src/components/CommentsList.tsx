import React, { Dispatch, SetStateAction, useState } from 'react';
import { deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[];
  setComments:Dispatch<SetStateAction<Comment[]>>
};

export const CommentsList:React.FC<Props> = ({
  comments,
  setComments,
}) => {
  const [hasDeletingError, setDeletingError] = useState(false);
  const [deletingId, setDeletingId] = useState(0);

  const handleDelete = async (commentId: number) => {
    setComments(current => current.filter(
      ({ id }) => id !== commentId,
    ));

    setDeletingId(commentId);
    try {
      await deleteComment(commentId);
    } catch {
      setDeletingError(true);
    }
  };

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
              onClick={() => handleDelete(comment.id)}
            >
              delete button
            </button>
          </div>
          <div className="message-body" data-cy="CommentBody">
            {comment.body}
          </div>

          {hasDeletingError && deletingId === comment.id && (
            <div
              className="notification is-danger"
            >
              Something went wrong!
            </div>
          )}
        </article>
      ))}
    </>
  );
};
