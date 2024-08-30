import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment;
  onDelete: (id: number) => void;
};

export const CommentInform: React.FC<Props> = ({ comment, onDelete }) => {
  const { id, name, email, body } = comment;

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
          onClick={() => onDelete(id)}
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
