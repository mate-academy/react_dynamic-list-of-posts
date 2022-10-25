import { SetStateAction } from 'react';
import { deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  id: number;
  name: string;
  email: string;
  body: string;
  setComments: (comment: SetStateAction<Comment[]>) => void;
};

export const CommentMessage: React.FC<Props> = ({
  name, email, body, id, setComments,
}) => {
  const handleDelete = (commentId: number) => {
    deleteComment(commentId);
    setComments((current: Comment[]) => {
      return current.filter(comment => comment.id !== id);
    });
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
          onClick={() => handleDelete(id)}
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
