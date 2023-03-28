import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment,
  removeComment: (commentId: number) => void,
};

export const CommentItem: React.FC<Props> = ({ comment, removeComment }) => (
  <article
    className="message is-small"
    data-cy="Comment"
  >
    <div className="message-header">
      <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
        {comment.name}
      </a>
      <button
        onClick={() => removeComment(comment.id)}
        data-cy="CommentDelete"
        type="button"
        className="delete is-small"
        aria-label="delete"
      >
        delete button
      </button>
    </div>

    <div className="message-body" data-cy="CommentBody">
      {comment.body}
    </div>
  </article>
);
