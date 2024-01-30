import React, { useState } from 'react';
import './CommentItem.scss';
import { Comment } from '../../types/Comment';
import { deleteComment } from '../../api/api';

type Props = {
  comment: Comment,
};

export const CommentItem: React.FC<Props> = React.memo(({ comment }) => {
  const {
    id,
    name,
    body,
    email,
  } = comment;

  const [showComment, setShowComment] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  function handleDeleteComment() {
    setShowComment(false);
    deleteComment(id)
      .catch(() => {
        setShowComment(true);
        setErrorMessage('Unable to delete comment');
      })
      .finally(() => {
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      });
  }

  return (
    <article
      className="message is-small"
      data-cy="Comment"
      key={id}
      style={{ display: showComment ? 'block' : 'none' }}
    >

      {errorMessage && (
        <div
          className="notification is-danger message__notification"
          data-cy="PostsLoadingError"
        >
          {errorMessage}
        </div>
      )}

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
});
