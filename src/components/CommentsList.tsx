import { Comment } from '../types/Comment';

type CommentsListProps = {
  comments: Comment[];
  handleDeleteComment: (url: string, msg: string, id: number) => void;
};

export const CommentsList = ({
  comments,
  handleDeleteComment,
}: CommentsListProps) => {
  const handleClick = handleDeleteComment.bind(
    this,
    '/comments/',
    'Unable to remove comment',
  );

  return (
    <>
      <p className="title is-4">Comments:</p>
      {comments.map(({
        email, name, body, id,
      }) => (
        <article key={id} className="message is-small" data-cy="Comment">
          <div className="message-header">
            <a href={`mailto:${email}`} data-cy="CommentAuthor">
              {name}
            </a>
            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
              onClick={() => handleClick(id)}
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
};
