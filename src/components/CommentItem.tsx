import React from 'react';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/comments';

type Props = {
  comment: Comment,
  setIsError: (value: boolean) => void,
  deleteCurrentComment: (id: number) => void,
};

export const CommentItem: React.FC<Props> = ({
  comment,
  setIsError,
  deleteCurrentComment,
}) => {
  const {
    id,
    name,
    email,
    body,
  } = comment;

  const handleDelete = () => {
    setIsError(false);
    deleteComment(id)
      .then(() => deleteCurrentComment(id))
      .catch(() => setIsError(true));
  };

  return (
    <article
      className="message is-small"
      data-cy="Comment"
    >
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={handleDelete}
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
