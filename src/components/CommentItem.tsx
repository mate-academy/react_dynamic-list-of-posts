import { useContext } from 'react';
import { Comment } from '../types/Comment';
import { CommentContext } from '../context/CommentProvider';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const { name, body, id, email } = comment;
  const { removeComment } = useContext(CommentContext);

  return (
    <article className="message is-small" data-cy="Comment" key={id}>
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>

        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => removeComment(id)}
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
