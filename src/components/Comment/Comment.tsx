import './Comment.scss';

export const Comment: React.FC = () => {
  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
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
        Some comment
      </div>
    </article>
  );
};
