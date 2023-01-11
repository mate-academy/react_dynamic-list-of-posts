import { FC, useState } from 'react';
import { useAppDispatch } from 'hooks/useRedux';
import Comment from 'models/Comment';
import CommentsAsync from 'store/comments/commentsAsync';
import { UiActions } from 'store/ui/uiSlice';

type Props = {
  comment: Comment;
};

const CommentItem:FC<Props> = ({ comment }) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const handleRemoveComment = () => {
    setLoading(true);
    dispatch(CommentsAsync.deleteComment(comment.id))
      .unwrap()
      .then(() => {
        dispatch(UiActions.enqueueSnackbar({
          message: 'Comment has been removed',
        }));
      })
      .finally(() => setLoading(false));
  };

  return (
    <article
      className="message is-small"
      data-cy="Comment"
    >
      <div className="message-header">
        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
          {comment.name}
        </a>

        <button
          data-cy="CommentDelete"
          disabled={loading}
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={handleRemoveComment}
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

export default CommentItem;
