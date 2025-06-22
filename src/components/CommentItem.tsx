import React from 'react';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/posts';

type Props = {
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const CommentItem: React.FC<Props> = ({ comment, setComments }) => {
  const handleClick = () => {
    let deletedIndex = -1;

    setComments(prev => {
      deletedIndex = prev.findIndex(item => item.id === comment.id);

      return prev.filter(item => item.id !== comment.id);
    });

    deleteComment(comment.id).catch(() => {
      setComments(prev => {
        const updated = [...prev];

        updated.splice(deletedIndex, 0, comment);

        return updated;
      });
    });
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
          onClick={handleClick}
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
