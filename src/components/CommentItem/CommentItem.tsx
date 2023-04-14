import React from 'react';
import { deleteComment } from '../../api/comment';
import { Comment } from '../../types/Comment';

type Props = {
  comment: Comment;
  onCommentDelete: (commentId: number) => void;
};

export const CommentItem: React.FC<Props> = ({
  comment: {
    id,
    name,
    email,
    body,
  },
  onCommentDelete,
}) => {
  const handleCommentDelete = async () => {
    onCommentDelete(id);

    deleteComment(id)
      .then(
        () => window.console.log('Comment was deleted successfully'),
        () => window.console.log('Error occured while comment removing'),
      );
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
          onClick={handleCommentDelete}
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
