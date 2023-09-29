import React from 'react';
import { deleteComment } from '../../api/posts';
import { usePosts } from '../../PostsContext';
import { Comment } from '../../types/Comment';
import { Errors } from '../../types/Errors';

type Props = {
  comment: Comment;
};

export const CommentItem: React.FC<Props> = ({ comment }) => {
  const {
    id,
    email,
    name,
    body,
  } = comment;

  const {
    setComments,
    errorMessage,
    setErrorMessage,
    removeError,
  } = usePosts();

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        setComments(currentComments => currentComments
          .filter(item => item.id !== commentId));
      })
      .catch(() => {
        setErrorMessage(Errors.deletingComment);
        removeError();
      });
  };

  return (
    <article
      key={id}
      className="message is-small"
      data-cy="Comment"
    >
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
          onClick={() => handleDeleteComment(id)}
        >
          delete button
        </button>
      </div>

      <div
        className="message-body"
        data-cy="CommentBody"
      >
        {body}
      </div>

      {errorMessage === Errors.deletingComment && (
        <div
          className="notification is-danger"
          data-cy="CommentsError"
        >
          {Errors.deletingComment}
        </div>
      )}
    </article>
  );
};
