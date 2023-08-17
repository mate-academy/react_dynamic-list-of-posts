import React from 'react';
import { Comment } from '../../types/Comment';

type Props = {
  comment: Comment,
  deleteComment: (commentId: number) => () => void,
};

export const CommentItem: React.FC<Props> = ({ comment, deleteComment }) => {
  const { name, body, id } = comment;

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={deleteComment(id)}
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
