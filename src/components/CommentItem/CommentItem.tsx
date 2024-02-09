import { useContext } from 'react';
import { removeComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { MainContext } from '../MainContext/MainContext';

type Props = {
  comment: Comment,
};

export const CommentItem: React.FC<Props> = ({ comment }) => {
  const { comments, setComments } = useContext(MainContext);

  const {
    id,
    email,
    name,
    body,
  } = comment;

  const handleRemoveComment = (commentId: number) => {
    setComments(
      prevComments => prevComments?.filter(elem => elem.id !== commentId),
    );

    removeComments(commentId)
      .then()
      .catch(() => {
        setComments(comments);
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
          onClick={() => handleRemoveComment(id)}
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
