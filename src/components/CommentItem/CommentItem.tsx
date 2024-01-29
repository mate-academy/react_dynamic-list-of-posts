import { Comment } from '../../types/Comment';

type Props = {
  comment: Comment,
};

export const CommentItem: React.FC<Props> = ({ comment }) => {
  const { id, name, body } = comment;

  return (
    <article
      className="message is-small"
      data-cy="Comment"
      key={id}
    >
      <div className="message-header">
        <a
          href="mailto:misha@mate.academy"
          data-cy="CommentAuthor"
        >
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
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
