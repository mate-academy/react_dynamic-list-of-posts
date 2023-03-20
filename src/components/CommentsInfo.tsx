import { FC } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment,
  onDelete: (id: number) => void,
};

export const CommentInfo: FC<Props> = ({
  comment,
  onDelete,
}) => {
  const hendlerDelete = () => {
    onDelete(comment.id);
  };

  return (
    <>
      <div className="message-header">
        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
          {comment.name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={hendlerDelete}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment.body}
      </div>
    </>
  );
};
