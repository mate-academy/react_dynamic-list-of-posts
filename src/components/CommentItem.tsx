import React, { Dispatch, SetStateAction } from 'react';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/fetches';

type Props = {
  comment: Comment;
  onDeleteItem: (commentId: number) => void;
  setDeletionError: Dispatch<SetStateAction<boolean>>;
};
export const CommentItem: React.FC<Props> = ({
  comment,
  onDeleteItem,
  setDeletionError,
}) => {
  const { name, body, email, id } = comment;

  const handleDeleteComment = () => {
    onDeleteItem(id);

    deleteComment(id)
      .then(() => {
        setDeletionError(false);
      })
      .catch(() => {
        setDeletionError(true);
      });
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={handleDeleteComment}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {body}
      </div>
    </article>
  );
};
