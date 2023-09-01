import React, { Dispatch, SetStateAction } from 'react';
import { CommentInt } from '../types/CommentInt';
import { deleteComment } from '../utils/RESTmethods';

type CommentProps = {
  comment: CommentInt,
  setComments: Dispatch<SetStateAction<CommentInt[]>>,
};

export const Comment: React.FC<CommentProps> = ({
  comment,
  setComments,
}) => {
  const {
    email,
    name,
    body,
    id,
  } = comment;

  const handleDeleteComment = (commentId: number) => {
    setComments(prevCom => [...prevCom].filter(com => com.id !== commentId));
    deleteComment(commentId);
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
          onClick={() => handleDeleteComment(id)}
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
