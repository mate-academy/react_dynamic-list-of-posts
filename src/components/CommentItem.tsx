import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment;
  handleDelete: (id: number) => void;
};

export const CommentItem: React.FC<Props> = ({ comment, handleDelete }) => {
  return (
    <article className="message is-small" data-cy="Comment" key={comment.id}>
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
    </article>
  );
};
