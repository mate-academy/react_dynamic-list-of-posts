import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  commentData: Comment,
  removeComment: (id: number) => Promise<void>
};

export const CommentUser: React.FC<Props> = ({
  commentData,
  removeComment,
}) => {
  const {
    name,
    email,
    body,
    id,
  } = commentData;

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
          onClick={() => removeComment(id)}
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
