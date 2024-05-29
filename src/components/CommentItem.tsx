import { deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';

interface Props {
  comment: Comment;
  removeComment: (id: number) => void;
}

export const CommentItem: React.FC<Props> = ({ comment, removeComment }) => {
  const { body, name, email, id } = comment;

  const handlerDelete = () => {
    deleteComment(id).then(() => removeComment(id));
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
          onClick={handlerDelete}
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
