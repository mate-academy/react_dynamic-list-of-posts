import { useContext } from 'react';
import { deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';
import { ListContext } from './ListContext';

type Props = {
  comment: Comment,
};

export const CommentItem: React.FC<Props> = ({ comment }) => {
  const { comments, setComments } = useContext(ListContext);
  const {
    id,
    email,
    name,
    body,
  } = comment;

  const handleDeleteButton = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        const newComments = comments.filter(({ id: currentCommentId }) => (
          currentCommentId !== commentId));

        setComments(newComments);
      });
  };

  return (
    <article
      className="message is-small"
      data-cy="Comment"
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
          onClick={() => handleDeleteButton(id)}
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
