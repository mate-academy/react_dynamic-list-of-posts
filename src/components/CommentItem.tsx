import React, { useCallback } from 'react';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/comments';

type Props = {
  comment: Comment;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const CommentItem: React.FC<Props> = ({
  comment,
  comments,
  setComments,
}) => {
  const {
    id,
    email,
    name,
    body,
  } = comment;

  const handleDeleteComment = useCallback(() => {
    const oldComments = [...comments];

    setComments((prevComments) => {
      return prevComments.filter((c) => c.id !== id);
    });

    deleteComment(id)
      .catch(() => {
        setComments(oldComments);
        // eslint-disable-next-line no-console
        console.error('Failed to delete comment');
      });
  }, [id, setComments, comments]);

  return (
    <article
      className="message is-small"
      data-cy="Comment"
    >
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
          onClick={handleDeleteComment}
        >
          delete button
        </button>
      </div>

      <div
        className="message-body"
        data-cy="CommentBody"
      >
        {body}
      </div>
    </article>
  );
};
