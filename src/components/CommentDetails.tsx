import { Comment } from '../types/Comment';

type Props = {
  comment: Comment;
  onDelete: (id: Comment['id']) => void;
};

export const CommentDetails: React.FC<Props> = ({ comment, onDelete }) => {
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
          onClick={() => onDelete(comment.id)}
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
