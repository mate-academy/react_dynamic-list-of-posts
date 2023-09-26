import { Comment } from '../types/Comment';
import { deleteCommentById } from '../api/comments';
import { useComments } from '../context/CommentsContext';

type Props = {
  currentComment: Comment;
};

export const CurrentComment: React.FC<Props> = ({ currentComment }) => {
  const {
    email, name, id, body,
  } = currentComment;

  const { setComments } = useComments();

  const handleDeleteComment = (commentId: number) => {
    deleteCommentById(commentId)
      .then(() => {
        setComments(prevComments => {
          return prevComments.filter((comment) => comment.id !== commentId);
        });
      })
      .catch(error => error.message());
  };

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
          onClick={() => handleDeleteComment(id)}
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
