import React from 'react';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/posts';

type Props = {
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const CommentItem: React.FC<Props> = ({ comment, setComments }) => {
  const { id, email, name, body } = comment;

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId);
    setComments(currentComments =>
      currentComments.filter(commentItem => commentItem.id !== commentId),
    );
  };

  return (
    <article key={id} className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
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
