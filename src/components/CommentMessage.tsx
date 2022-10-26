type Props = {
  id: number;
  name: string;
  email: string;
  body: string;
  onDelete: (id: number) => void;
};

export const CommentMessage: React.FC<Props> = ({
  name, email, body, id, onDelete,
}) => {
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
          onClick={() => onDelete(id)}
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
