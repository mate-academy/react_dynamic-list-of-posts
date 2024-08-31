import { useAppContext } from '../../BLoC/App/AppContext';
import { Comment } from '../../types';

type Props = {
  comment: Comment;
};

export const CommentCard = ({ comment }: Props) => {
  const { deleteComment } = useAppContext();

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
          {comment.name}
        </a>
        <button
          onClick={() => deleteComment(comment)}
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
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
