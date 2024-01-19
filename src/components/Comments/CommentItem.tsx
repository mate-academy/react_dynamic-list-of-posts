import { useContext } from 'react';
import { Comment } from '../../types/Comment';
import { deleteComment } from '../../utils/api/comments';
import { PostsContext } from '../PostsContext';

export const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { comments, setComments } = useContext(PostsContext);

  const doDeleteComment = (id: number) => {
    setComments(comments && comments.filter(item => item.id !== id));
    deleteComment(id.toString());
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a
          href={`mailto:${comment.email}`}
          data-cy="CommentAuthor"
        >
          {comment.name}
        </a>

        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => doDeleteComment(comment.id)}
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
