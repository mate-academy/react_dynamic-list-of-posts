import { Comment } from '../../types/Comment';

type PropTypes = {
  comment: Comment;
  deleteComment: (commentId: number) => void;
};

export const CommentItem: React.FC<PropTypes> = ({
  comment,
  deleteComment,
}) => {
  const {
    name,
    email,
    body: commentBody,
    id,
  } = comment;

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
          onClick={() => {
            deleteComment(id);
          }}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {commentBody}
      </div>
    </article>
  );
};
