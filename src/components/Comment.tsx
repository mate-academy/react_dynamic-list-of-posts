import { Comment } from '../types/Comment';

type Props = {
  comment: Comment;
  handleCommentDelete: (commentId: number) => void;
};

export const CommentCard: React.FC<Props> = ({
  comment,
  handleCommentDelete,
}) => {
  const {
    id, email, name, body,
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
          onClick={() => {
            handleCommentDelete(id);
          }}
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
