import { FC } from 'react';
import { Comment } from '../../types/Comment';
import { useDeleteComment } from '../../hooks/useDeleteComment';

type Props = {
  comment: Comment;
};
export const CommentItem: FC<Props> = ({ comment }) => {
  const { mutate } = useDeleteComment();

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
          onClick={() => mutate(comment.id)}
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
