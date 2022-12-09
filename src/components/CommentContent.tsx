import { FC } from 'react';
import { Comment } from '../types/Comment';
import { deleteComment } from '../utils/requests';

type Props = {
  comment: Comment,
  setComments: React.Dispatch<React.SetStateAction<Comment[] | []>>,
  setIsDeleteError: React.Dispatch<React.SetStateAction<boolean>>,
  commentsBeforeFilter: Comment[],
  setCommentsBeforeFilter: React.Dispatch<React.SetStateAction<Comment[]>>,
};

export const CommentContent: FC<Props> = ({
  comment,
  setComments,
  setIsDeleteError,
  commentsBeforeFilter,
  setCommentsBeforeFilter,
}) => {
  const {
    email, body, name, id,
  } = comment;

  const handleDeleteComment = async (commentId: number) => {
    try {
      setComments((prevComments) => prevComments
        .filter(el => el.id !== commentId));

      await deleteComment(commentId);

      setCommentsBeforeFilter((prevComments) => prevComments
        .filter(el => el.id !== commentId));
    } catch {
      setIsDeleteError(true);
      setComments(commentsBeforeFilter);
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
