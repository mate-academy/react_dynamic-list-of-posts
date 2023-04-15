import React from 'react';
import { Comment } from '../../types/Comment';

type Props = {
  comment: Comment;
  onCommentDelete: (commentId: number) => void;
};

export const CommentItem: React.FC<Props> = React.memo(({
  comment: {
    id,
    name,
    email,
    body,
  },
  onCommentDelete,
}) => (
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
));
