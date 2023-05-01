import React, { FC } from 'react';
import { CommentType } from '../types/CommentType';
import { deleteComment } from '../api/comments';

type Props = {
  comment: CommentType;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

export const Comment: FC<Props> = ({ comment, setComments }) => {
  const {
    name,
    email,
    body,
    id,
  } = comment;

  const handleRemoveComment = async () => {
    setComments(prevState => prevState.filter(
      comm => comm.id !== id,
    ));
    deleteComment(id);
  };

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
          onClick={handleRemoveComment}
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
