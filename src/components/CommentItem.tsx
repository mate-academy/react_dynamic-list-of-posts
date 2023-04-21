import { FC } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment,
  handleDelete: (commentId: number) => void,
};

export const CommentItem: FC<Props> = ({ comment, handleDelete }) => {
  const {
    name,
    email,
    body,
    id,
  } = comment;

  const onDelete = () => {
    handleDelete(id);
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
          onClick={onDelete}
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
