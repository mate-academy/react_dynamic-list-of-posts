import { useContext } from 'react';
import { Comment } from '../../types/Comment';
import { CommentsContext } from '../CommentsContext';
import { deleteCommentById } from '../../api/api';

type Props = {
  comment: Comment;
};

export const CommentItem: React.FC<Props> = ({ comment }) => {
  const {
    id,
    email,
    name,
    body,
  } = comment;
  const { comments, setComments } = useContext(CommentsContext);

  const handleDeleteComment = () => {
    setComments(comments.filter(({ id: comId }) => comId !== id));

    deleteCommentById(id);
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
          onClick={handleDeleteComment}
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
