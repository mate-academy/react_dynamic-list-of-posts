import React from 'react';
import { Comment } from '../../types/Comment';

type Props = {
  comments: Comment[];
  onDelete: (commentId: number) => void;
};

export const Comments: React.FC<Props> = ({ comments, onDelete }) => {
  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => (
        <article
          key={comment.id}
          className="message is-small"
          data-cy="Comment"
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
            >
              delete button
            </button>
          </div>

          <div className="message-body" data-cy="CommentBody">
            {comment.body}
          </div>

        </article>
      ))}
    </>
  );
};
