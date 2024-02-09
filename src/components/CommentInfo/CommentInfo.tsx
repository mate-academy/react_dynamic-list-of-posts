import { useContext } from 'react';
import { Comment } from '../../types/Comment';
import { CommentsUpdateContext } from '../../contexts/CommentsProvider';

interface Props {
  comment: Comment,
}

export const CommentInfo: React.FC<Props> = (
  {
    comment: {
      name,
      email,
      body,
      id,
    },
  },
) => {
  const { deleteComment } = useContext(CommentsUpdateContext);

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>
        <button
          onClick={() => deleteComment(id)}
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
