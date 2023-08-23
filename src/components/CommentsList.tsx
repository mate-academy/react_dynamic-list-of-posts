import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[];
  commentsDelError: number[];
  onDeleteComment: (commentId: number) => void;
};

export const CommentsList: React.FC<Props> = ({
  comments,
  commentsDelError,
  onDeleteComment,
}) => (
  <>
    <p className="title is-4">Comments:</p>

    {comments.map(({
      id,
      name,
      email,
      body,
    }) => (
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
            onClick={() => onDeleteComment(id)}
          >
            delete button
          </button>
        </div>

        <div className="message-body" data-cy="CommentBody">
          {body}
        </div>

        {commentsDelError.includes(id) && (
          <div
            className="notification is-danger"
            data-cy="PostsLoadingError"
          >
            Can&apos;t delete comment. Try again later.
          </div>
        )}
      </article>
    ))}
  </>
);
