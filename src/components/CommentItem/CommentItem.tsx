import { useContext } from 'react';
import { CommentsContext } from '../../Context/CommentsContext';
import { Comment } from '../../types/Comment';
import * as commentsApiServise from '../../api/CommentApi';

type CommentItemProps = {
  comment: Comment;
};

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const { onDeleteComment } = useContext(CommentsContext);
  // const { notificationDispatch } = useContext(NotificationContent);

  const handleCommentDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    commentId: number,
  ) => {
    event.preventDefault();

    try {
      commentsApiServise.deleteComment(commentId);
      onDeleteComment(commentId);
    } catch {
      throw new Error();
    }
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
          {comment.name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={event => handleCommentDelete(event, comment.id)}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment.body}
      </div>
    </article>
  );
};
