import React from 'react';

import { Comment as CommentType } from '../types/Comment';

type Props = {
  comment: CommentType;
  onCommentDeleted: (commentId: number) => Promise<unknown>;
  clearErrorMessage: () => void;
  setErrorMessage: (message: string) => void;
};

const CommentBase: React.FC<Props> = ({
  comment,
  onCommentDeleted,
  clearErrorMessage,
  setErrorMessage,
}) => {
  const { id, name, body, email } = comment;

  const handleDeleteComment = () => {
    clearErrorMessage();
    onCommentDeleted(id).catch(() => {
      setErrorMessage('Cannot delete comment.');
    });
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
          className="delete is-small"
          aria-label="delete"
          onClick={handleDeleteComment}
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

export const Comment = React.memo(CommentBase);
