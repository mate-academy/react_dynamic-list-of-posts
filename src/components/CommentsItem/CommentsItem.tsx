import { useComments } from '../../context';
import { Comment } from '../../types';
import { deleteComment } from '../../utils/deleteComment';

interface Props {
  comment: Comment;
}

export const CommentsItem: React.FC<Props> = ({ comment }) => {
  const { name, body, email } = comment;

  const { handleDeleteComment } = useComments();

  const handleOnDeleteComment = (commentId: number) => {
    handleDeleteComment(commentId);
    deleteComment(commentId);
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>
        <button
          onClick={() => handleOnDeleteComment(comment.id)}
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
  );
};
