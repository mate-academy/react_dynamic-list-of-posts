import { Comment } from '../../types/Comment';

interface Props {
  comments: Comment[];
  removeCommentById: (commentId: number) => void;
}

export const CommentsList: React.FC<Props> = ({
  comments,
  removeCommentById,
}) => {
  const handleDeleteComment = (commentId: number) => {
    removeCommentById(commentId);
  };

  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(({
        id,
        name,
        email,
        body,
      }) => (
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
              onClick={() => handleDeleteComment(id)}
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
