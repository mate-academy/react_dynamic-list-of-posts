import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteComment = useCallback(() => {
    const oldComments = [...comments];

    setComments((prevComments) => {
      return prevComments.filter((c) => c.id !== comment.id);
    });
    setIsDeleting(true);

    deleteComment(comment.id)
      .catch(() => {
        setComments(oldComments);
        // eslint-disable-next-line no-console
        console.error('Failed to delete comment');
      })
      .finally(() => {
        setIsDeleting(false);
      });
  }, [comment.id, setComments, comments]);

  return (
    !isDeleting && (
      <article
        className={classNames('message', 'is-small', {
          // 'is-hidden': isDeleting,
        })}
        data-cy="Comment"
      >
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
            onClick={handleDeleteComment}
          >
            delete button
          </button>
        </div>

        <div
          className="message-body"
          data-cy="CommentBody"
        >
          {comment.body}
        </div>
      </article>
    )
  );
};
