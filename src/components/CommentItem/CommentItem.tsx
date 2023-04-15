import React from 'react';
import { deleteComment } from '../../api/comment';
import { useDataLoader } from '../../hooks/useDataLoader';
import { Comment } from '../../types/Comment';

type Props = {
  comment: Comment;
  onCommentDelete: (commentId: number) => void;
};

export const CommentItem: React.FC<Props> = React.memo(({
  comment: {
    id,
    name,
    email,
    body,
  },
  onCommentDelete,
}) => {
  const [, loadData] = useDataLoader();

  const handleCommentDelete = async () => {
    onCommentDelete(id);
    loadData(() => deleteComment(id));
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
});
