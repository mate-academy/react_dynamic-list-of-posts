import { FC } from 'react';
import { Comment } from '../../types/Comment';

interface Props {
  comment: Comment,
  onDelete: (commentId: number) => void;
}

export const CommentItem: FC<Props> = (props) => {
  const { comment, onDelete } = props;
  const {
    name,
    body,
    email,
    id,
  } = comment;

  return (
    <article
      className="message is-small"
      data-cy="Comment"
    >
      <div className="message-header">
        <a
          href={`mailto:${email}`}
          data-cy="CommentAuthor"
        >
          {name}
        </a>

        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => onDelete(id)}
        >
          delete button
        </button>
      </div>

      <div
        className="message-body"
        data-cy="CommentBody"
      >
        {body}
      </div>
    </article>
  );
};
