import React from 'react';

import { Comment } from '../types/Comment';

interface Props {
  comment: Comment;
  handleDelete: (deleteId: number) => Promise<void>;
}

export const CommentComponent: React.FC<Props> = React.memo(
  ({ comment, handleDelete }) => {
    const { name, email, body } = comment;

    return (
      <>
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
              onClick={() => handleDelete(comment.id)}
            >
              delete button
            </button>
          </div>
          <div className="message-body" data-cy="CommentBody">
            {body}
          </div>
        </article>
      </>
    );
  },
);

CommentComponent.displayName = 'CommentComponent';
