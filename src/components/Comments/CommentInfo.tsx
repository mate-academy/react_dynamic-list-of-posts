import { Comment } from '../../types/Comment';

type Props = {
  comment: Comment;
  onClickDeleteComment: (commentId: number) => void;
};

const CommentInfo = ({ comment, onClickDeleteComment }: Props) => {
  const { name, email, body, id } = comment;

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
          onClick={() => onClickDeleteComment(id)}
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

export default CommentInfo;
