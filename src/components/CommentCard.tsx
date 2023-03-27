import React from 'react';
import { CommentData } from '../types/Comment';

type CommentCardtProps = {
  comment: CommentData,
  onDeleteComment: (id: number) => void,
};

export const CommentCard: React.FC<CommentCardtProps> = ({
  comment,
  onDeleteComment,
}) => {
  return (
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
          onClick={() => {
            onDeleteComment(comment.id);
          }}
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
