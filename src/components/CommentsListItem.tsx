import React from 'react';
import { Comment } from '../types/Comment';
import { HandleCommentDeleteClick } from '../types/handlers';

type Props = {
  comment: Comment;
  onCommentDeleteClick: HandleCommentDeleteClick;
};

export const CommentsListItem: React.FC<Props> = ({
  comment,
  onCommentDeleteClick,
}) => {
  const { id, email, name, body } = comment;

  const handleDeleteButtonClick = () => {
    onCommentDeleteClick(id);
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
          onClick={handleDeleteButtonClick}
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
