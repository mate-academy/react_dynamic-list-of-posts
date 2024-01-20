import { useContext } from 'react';
import { Comment } from '../../types/Comment';
import { deleteComment } from '../../utils/api/comments';
import { MainContext } from '../MainContext';

export const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { comments, setComments } = useContext(MainContext);
  const {
    name,
    email,
    id,
    body,
  } = comment;

  const doDeleteComment = (commentId: number) => {
    setComments(comments && comments.filter(item => item.id !== commentId));
    deleteComment(commentId.toString());
  };

  return (
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
          onClick={() => doDeleteComment(id)}
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
