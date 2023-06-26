import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment,
  commentDestroyer: (id: number) => void,
};

export const CommentInfo: React.FC<Props> = ({ comment, commentDestroyer }) => {
  return (
    <>
      <div className="message-header">
        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
          {comment.name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => commentDestroyer(comment.id)}
        />
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment.body}
      </div>
    </>
  );
};
