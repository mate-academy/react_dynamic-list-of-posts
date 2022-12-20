import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment,
  onCommentDelete: (id: number) => void,
};

export const CommentItem: React.FC<Props> = ({ comment, onCommentDelete }) => (
  <article className="message is-small" data-cy="Comment">
    <div className="message-header">
      <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
        {comment.name}
      </a>
      <button
        data-cy="CommentDelete"
        type="button"
        className="delete is-small"
        aria-label="delete"
        onClick={() => onCommentDelete(comment.id)}
      >
        delete button
      </button>
    </div>

    <div className="message-body" data-cy="CommentBody">
      {comment.body}
    </div>
  </article>
);
