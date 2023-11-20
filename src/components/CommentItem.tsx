import React from 'react';
import { Comment } from '../types/Comment';

interface Props {
  comment: Comment,
  onCommentDelete: (value: Comment) => void
}

const CommentItem: React.FC<Props> = ({ comment, onCommentDelete }) => {
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
          onClick={() => onCommentDelete(comment)}
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

export default CommentItem;
