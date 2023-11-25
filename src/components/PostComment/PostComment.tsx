import React from 'react';
import { Comment } from '../../types/Comment';

type Props = {
  comment: Comment,
  handleDeleteClick: (id :number) => void,
};

export const PostComment:React.FC<Props> = ({ comment, handleDeleteClick }) => {
  const {
    body, name, email, id,
  } = comment;

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
          onClick={() => handleDeleteClick(id)}
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
