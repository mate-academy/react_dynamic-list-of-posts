import { MessageProps } from '../../../../types';

export const Message: React.FC<MessageProps> = ({
  comment,
  removeComment,
}) => (
  <article className="message is-small" data-cy="Comment">
    <div className="message-header">
      <a
        href={`mailto:${comment.email}`}
        data-cy="CommentAuthor"
      >
        {comment.name}
      </a>
      <button
        type="button"
        data-cy="CommentDelete"
        aria-label="delete"
        className="delete is-small"
        onClick={() => removeComment(comment.id)}
      />
    </div>

    <div className="message-body" data-cy="CommentBody">
      {comment.body}
    </div>
  </article>
);
