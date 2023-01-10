import React from 'react';

import { Comment } from '../types/Comment';
import { deleteComment } from '../api/comments';

type Props = {
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const CommentItem: React.FC<Props> = (props) => {
  const { comment, setComments } = props;

  const removeComment = (commentId: number) => {
    deleteComment(commentId);
    setComments(currentComments => currentComments.filter(item => {
      return item.id !== commentId;
    }));
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a
          href={`mailto:${comment.email}`}
          data-cy="CommentAuthor"
        >
          {comment.name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => removeComment(comment.id)}
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
