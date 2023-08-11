import { Comment } from '../types/Comment';

type Props = {
  comment: Comment,
  removeComment: (id: number) => void,
};

export const CommentInfo: React.FC<Props> = ({
  comment,
  removeComment,
}) => {
  const {
    id,
    name,
    email,
    body,
  } = comment;

  return (
    <article
      className="message is-small"
      data-cy="Comment"
      key={id}
    >
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => removeComment(id)}
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
