import { useState } from 'react';
import { deleteComment } from '../../api/Comments';
import { Comment as CommentType } from '../../types/Comment';

type Props = {
  comment: CommentType;
  onCommentDelete: (commentId: number) => void;
};

export const CommentItem = ({ comment, onCommentDelete }: Props) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleCommentDelete = (commentId: number) => {
    setErrorMessage('');

    deleteComment(commentId).catch(() =>
      setErrorMessage('Failed to delete a comment.'),
    );

    onCommentDelete(commentId);
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
          onClick={() => handleCommentDelete(comment.id)}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment.body}
      </div>

      {errorMessage && (
        <p className="help is-danger" data-cy="FormErrorMessage">
          {errorMessage}
        </p>
      )}
    </article>
  );
};
