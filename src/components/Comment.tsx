import { Comment } from '../types/Comment';

type Props = {
  comment: Comment;
  onDelete: (id: number) => void;
};

export const CommentObj: React.FC<Props> = ({ comment, onDelete }) => {
  const { id, email, name, body } = { ...comment };

  return (
    <article key={id} className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
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

      <div className="message-body" data-cy="CommentBody">
        {body}
      </div>
    </article>
  );
};
