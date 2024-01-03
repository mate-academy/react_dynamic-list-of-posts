import { useCallback, useContext } from 'react';
import { Comment } from '../../libs/types';
import { actions } from '../../libs/actions/actions';
import { DispatchContext } from '../../store';
import { deleteComment } from '../../api/comments';

type Props = {
  comment: Comment;
};

export const CommentsItem: React.FC<Props> = ({ comment }) => {
  const {
    id, name, email, body,
  } = comment;
  const dispatch = useContext(DispatchContext);

  const handleDeleteComment = useCallback(() => {
    actions.deleteComment(dispatch, id);

    deleteComment(id)
      .catch(() => {
        actions.showErrorMessage(dispatch);
        actions.addComment(dispatch, comment);
      });
  }, [comment, dispatch, id]);

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
