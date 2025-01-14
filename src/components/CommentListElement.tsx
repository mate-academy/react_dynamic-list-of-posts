import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  comment: Comment;
  setCommentsFromServer: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const CommentListElement: React.FC<Props> = ({
  comment,
  setCommentsFromServer,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const onDelete = async () => {
    setIsDeleting(true);
    setErrorKey(null);

    try {
      await client.delete(`/comments/${comment.id}`);
      setCommentsFromServer(prev => {
        const updatedComments = prev.filter(
          commentInList => commentInList.id !== comment.id,
        );

        return updatedComments;
      });
    } catch (err) {
      setErrorKey('CommentDeleteError');
    } finally {
      setIsDeleting(false);
    }
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
          className={`delete is-small ${isDeleting ? 'is-loading' : ''}`}
          aria-label="delete"
          onClick={onDelete}
          disabled={isDeleting}
        ></button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment.body}
      </div>

      {errorKey && (
        <div className="notification is-danger" data-cy={`${errorKey}`}>
          Something went wrong!
        </div>
      )}
    </article>
  );
};
