import { useContext } from 'react';
import { deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';
import { ListContext } from './ListContext';

type Props = {
  comment: Comment,
};

export const CommentItem: React.FC<Props> = ({ comment }) => {
  const { comments, setComments } = useContext(ListContext);

  const handleDeleteButton = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        const newComments = comments.filter(currentComment => (
          currentComment.id !== commentId));

        setComments(newComments);
      });
  };

  return (
    <article
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
          onClick={() => handleDeleteButton(comment.id)}
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
