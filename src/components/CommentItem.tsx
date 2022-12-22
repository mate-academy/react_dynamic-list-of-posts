import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment,
  onCommentDelete: (id: number) => void,
};

export const CommentItem: React.FC<Props> = ({ comment, onCommentDelete }) => {
  const {
    name,
    email,
    id,
    body,
  } = comment;

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
          onClick={() => onCommentDelete(id)}
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
