import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment;
  onDelete: (comentId: number) => void;
};

export const CommentField: React.FC<Props> = ({ comment, onDelete }) => (
  <article
    className="message is-small"
    data-cy="Comment"
    key={comment.id}
  >
    <div className="message-header">
      <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
        {comment.name}
      </a>
      <button
        data-cy="CommentDelete"
        type="button"
        className="delete is-small"
        aria-label="delete"
        onClick={() => onDelete(comment.id)}
      >
        delete button
      </button>
    </div>

    <div className="message-body" data-cy="CommentBody">
      {comment.body}
    </div>
  </article>
);
