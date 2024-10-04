import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface Props {
  comment: Comment;
  setComments: (
    updateFn: (prevComments: Comment[] | null) => Comment[] | null,
  ) => void;
}

export const CommentItem: React.FC<Props> = ({
  comment: { name, email, body, id },
  setComments,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const deleteComment = () => {
    setIsDeleted(true);
    client.delete(`/comments/${id}`);
    setComments(prevComments => {
      if (!prevComments) {
        return prevComments;
      }

      return prevComments.filter(comment => comment.id !== id);
    });
  };

  if (isDeleted) {
    return;
  }

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
          onClick={deleteComment}
        ></button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {body}
      </div>
    </article>
  );
};
