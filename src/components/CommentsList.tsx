import { Comment } from '../types/Comment';

type CommentsListProps = {
  comments: Comment[];
};

export const CommentsList = ({ comments }: CommentsListProps) => (
  <>
    {comments.map(({ email, name, body }) => (
      <article className="message is-small" data-cy="Comment">
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
          >
            delete button
          </button>
        </div>

        <div className="message-body" data-cy="CommentBody">
          {body}
        </div>
      </article>
    ))}
  </>
);
