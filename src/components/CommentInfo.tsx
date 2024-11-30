import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import classNames from 'classnames';

type Props = {
  comment: Comment;
  onDelete: (commentId: number) => Promise<void>;
};

export const CommentInfo: React.FC<Props> = ({ comment, onDelete }) => {
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(
    null,
  );
  const { id, name, email, body } = comment;

  const handleDelete = (commentId: number) => {
    setDeletingCommentId(commentId);

    onDelete(commentId).finally(() => setDeletingCommentId(null));
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className={classNames('button delete is-small', {
            'is-loading': deletingCommentId === id,
          })}
          aria-label="delete"
          onClick={() => handleDelete(id)}
        ></button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {body}
      </div>
    </article>
  );
};
