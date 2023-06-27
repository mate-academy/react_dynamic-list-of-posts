import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment,
  onDeleteComment: (id: number) => void,
};

export const CommentInfo: React.FC<Props> = ({ comment, onDeleteComment }) => {
  const {
    name, email, id, body,
  } = comment;

  return (
    <>
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => onDeleteComment(id)}
        />
      </div>

      <div className="message-body" data-cy="CommentBody">
        {body}
      </div>
    </>
  );
};
