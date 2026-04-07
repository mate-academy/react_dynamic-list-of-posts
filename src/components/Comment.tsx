import { Comment } from '../types/Comment';

interface CommentProps {
  comment: Comment;
  handleDeleteComment: (comment: Comment) => void;
}

export const CommentItem: React.FC<CommentProps> = ({
  comment,
  handleDeleteComment,
}) => {
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
          onClick={() => handleDeleteComment(comment)}
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
