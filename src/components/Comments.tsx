import React from 'react';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/client';

type Props = {
  comments: Comment[],
  setComments: (comments: Comment[]) => void,
  setIsCommentsError: (value: boolean) => void,
};

export const Comments: React.FC<Props> = ({
  comments,
  setComments,
  setIsCommentsError,
}) => {
  const onDelete = (commentId: number) => {
    setComments(comments.filter(({ id }) => id !== commentId));
    deleteComment(commentId)
      .catch(() => {
        setIsCommentsError(true);
      });
  };

  return (
    <>
      <p className="title is-4">Comments:</p>
      {comments.map((comment) => (
        <article
          className="message is-small"
          data-cy="Comment"
          key={comment.id}
        >
          <div className="message-header">
            <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
              {comment.name}
            </a>
            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
              onClick={() => onDelete(comment.id)}
            />
          </div>

          <div className="message-body" data-cy="CommentBody">
            {comment.body}
          </div>
        </article>
      ))}
    </>
  );
};
