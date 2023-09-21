import { Comment } from '../../types/Comment';

type Props = {
  comment: Comment;
};

export const CommentItem: React.FC<Props> = ({ comment }) => {
  const { email, name, body } = comment;

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
/* <article className="message is-small" data-cy="Comment">
        <div className="message-header">
          <a
            href="mailto:misha@mate.academy"
            data-cy="CommentAuthor"
          >
            Misha Hrynko
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
        <div
          className="message-body"
          data-cy="CommentBody"
        >
          One more comment
        </div>
      </article>

      <article className="message is-small" data-cy="Comment">
        <div className="message-header">
          <a
            href="mailto:misha@mate.academy"
            data-cy="CommentAuthor"
          >
            Misha Hrynko
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
          {'Multi\nline\ncomment'}
        </div>
      </article> */
