import React from 'react';
import { IComment } from '../models/IComment';
import { useComment } from '../hooks/useComment';

type CommentListItemProps = {
  comment: IComment,
};

const CommentListItem:React.FC<CommentListItemProps> = ({ comment }) => {
  const { removeComment } = useComment();

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
          {comment.name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => removeComment(comment.id)}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment.body}
      </div>
    </article>
  );
};

export default CommentListItem;
