import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment;
  deleteComment: (commentId: number) => void;
};

export const OneComment: React.FC<Props> = ({ comment, deleteComment }) => {
  return (
    <article
      key={comment.id}
      data-cy="Comment"
      className="message is-small"
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
          onClick={() => deleteComment(comment.id)}
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
