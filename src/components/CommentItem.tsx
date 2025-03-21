import { Comment } from '../types/Comment';

type Props = {
  comment: Comment;
  onDelete: (commentId: number) => void;
};

export const CommentItem: React.FC<Props> = ({ comment, onDelete }) => {
  const { id, email, body, name } = comment;

  const handleDelete = () => {
    onDelete(id);
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
          onClick={handleDelete}
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
