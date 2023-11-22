import React from 'react';
import { Comment } from '../types/Comment';
import { deleteComment } from '../utils/helpers';

type Props = {
  comment: Comment,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
};

export const CommentItem: React.FC<Props> = ({
  comment,
  setComments,
}) => {
  const handleDeleteComment = async (commentId: number) => {
    const isDeleted = await deleteComment(commentId);

    if (isDeleted) {
      setComments(prev => {
        return prev?.filter(currComment => currComment.id !== commentId);
      });
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
          className="delete is-small"
          aria-label="delete"
          onClick={() => handleDeleteComment(comment.id)}
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
