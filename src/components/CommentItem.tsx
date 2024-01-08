import { useContext } from 'react';
import { deleteCommentById } from '../api/posts';
import { Comment } from '../types/Comment';
import { DispatchContext } from '../PostsContext';
import { ReducerType } from '../types/ReducerType';

interface Props {
  comment: Comment
}

export const CommentItem: React.FC<Props> = ({
  comment,
}) => {
  const dispatch = useContext(DispatchContext);
  const {
    email,
    name,
    body,
    id,
  } = comment;

  const handleButtonDelete = () => {
    dispatch({
      type: ReducerType.DeleteComment,
      payload: id,
    });
    deleteCommentById(id);
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a
          href={`mailto:${email}`}
          data-cy="CommentAuthor"
        >
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={handleButtonDelete}
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
