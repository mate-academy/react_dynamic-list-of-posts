import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[];
  onCommentDelete: (id: number) => void;
};

export const CommentsList: React.FC<Props> = ({
  comments,
  onCommentDelete,
}) => (
  <>
    <p className="title is-4">Comments:</p>

    {comments.map(({
      id,
      email,
      name,
      body,
    }) => (
      <article
        key={id}
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
            onClick={() => onCommentDelete(id)}
          >
            delete button
          </button>
        </div>
        <div
          className="message-body"
          data-cy="CommentBody"
        >
          {body}
        </div>
      </article>
    ))}
  </>
);
