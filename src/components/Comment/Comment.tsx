import { CommentType } from '../../types/Comment';

type Props = {
  comment: CommentType,
  onDelete: (commentId: number) => void,
};

export const Comment: React.FC<Props> = ({ comment, onDelete }) => {
  return (
    <article
      className="message is-small"
      data-cy="Comment"
      key={comment.id}
    >
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
