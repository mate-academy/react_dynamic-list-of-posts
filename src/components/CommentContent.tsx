import { FC } from 'react';
import { Comment } from '../types/Comment';
import { deleteComment } from '../utils/requests';

type Props = {
  comment: Comment,
  setComments: React.Dispatch<React.SetStateAction<Comment[] | []>>,
};

export const CommentContent: FC<Props> = ({ comment, setComments }) => {
  const {
    email, body, name, id,
  } = comment;

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);

      setComments((prev) => prev.filter(el => el.id !== commentId));
    } catch {
      throw new Error('unable to delete commment');
    }
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
          onClick={() => handleDeleteComment(id)}
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
