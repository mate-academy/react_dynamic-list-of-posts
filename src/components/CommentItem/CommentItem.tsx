import React, { useCallback, useContext } from 'react';

import { DispatchContext } from '../../Store';

import { deleteComment } from '../../api/comments';

import { Comment } from '../../types/Comment';
import { Error } from '../../types/Error';

type Props = {
  comment: Comment;
};

export const CommentItem: React.FC<Props> = ({ comment }) => {
  const dispatch = useContext(DispatchContext);
  const { name, email, body } = comment;

  const handleDeleteCommentError = useCallback(() => {
    dispatch({ type: 'setError', payload: Error.DeleteComment });
    setTimeout(() => {
      dispatch({ type: 'setError', payload: '' });
    }, 3000);
  }, [dispatch]);

  const handleDeleteComment = useCallback(async () => {
    dispatch({ type: 'deleteComment', payload: comment });

    try {
      await deleteComment(comment.id);
    } catch (e) {
      handleDeleteCommentError();
    }
  }, [comment, dispatch, handleDeleteCommentError]);

  return (
    <article
      data-cy="Comment"
      className="message is-small"
    >
      <div className="message-header">
        <a
          data-cy="CommentAuthor"
          href={`mailto:${email}`}
        >
          {name}
        </a>

        <button
          type="button"
          data-cy="CommentDelete"
          aria-label="delete"
          className="delete is-small"
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
