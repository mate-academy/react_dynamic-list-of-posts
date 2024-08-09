import React from 'react';
import { Comment } from '../types/Comment';
import { useValues } from '../SharedContext';

type Props = {
  comment: Comment;
};

export const CommentsListItem: React.FC<Props> = ({ comment }) => {
  const { id, name, email, body } = comment;
  const { handleDeleteComment } = useValues();

  const handleSubmitDeleteComment = () => {
    handleDeleteComment(id);
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={email} data-cy="CommentAuthor">
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={handleSubmitDeleteComment}
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
