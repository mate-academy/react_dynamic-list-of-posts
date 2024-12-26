import React from 'react';
import { Comment as CommentItem } from '../types/Comment';

type Props = {
  comment: CommentItem;
  handleDeleteComment: (commentId: number) => void;
};

const Comment: React.FC<Props> = props => {
  const { comment, handleDeleteComment } = props;

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
          {comment.name}
        </a>
        <button
          onClick={() => handleDeleteComment(comment.id)}
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
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

export default React.memo(Comment);
