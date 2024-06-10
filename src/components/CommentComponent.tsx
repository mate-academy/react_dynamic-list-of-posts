import { useState } from 'react';
import { Comment } from '../types/Comment';
import { deleteComment } from '../utils/httpClient';

export interface CommentType {
  comment: Comment;
  removeComment: (id: number) => void;
}

export const CommentComponent: React.FC<CommentType> = ({
  comment,
  removeComment,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const deleteComm = () => {
    setIsDisabled(true);

    deleteComment(comment.id)
      .then(() => {
        removeComment(comment.id);
      })
      .finally(() => {
        setIsDisabled(false);
      });
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
          {comment.name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={deleteComm}
          disabled={isDisabled}
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
