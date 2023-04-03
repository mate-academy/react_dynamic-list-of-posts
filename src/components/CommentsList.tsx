import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[];
  handleCommentDelete: (id: number) => void;
};

export const CommentsList: React.FC<Props> = ({
  comments,
  handleCommentDelete,
}) => {
  return (
    <>
      {comments.map(comment => (
        <article
          key={comment.id}
          className="message is-small"
          data-cy="Comment"
        >
          <div className="message-header">
            <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
              {comment.name}
            </a>
            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
              onClick={() => handleCommentDelete(comment.id)}
            >
              delete button
            </button>
          </div>

          <div className="message-body" data-cy="CommentBody">
            {comment.body}
          </div>
        </article>
      ))}
    </>
  );
};
