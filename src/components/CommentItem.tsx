import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment;
  handleDelete: (id: number) => Promise<void>;
};

export const CommentItem: React.FC<Props> = (
  {
    comment:
    {
      id,
      email,
      body,
      name,
    },
    handleDelete,
  },
) => {
  return (
    <>
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => handleDelete(id)}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {body}
      </div>
    </>
  );
};
