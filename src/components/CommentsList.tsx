import React from 'react';
import { Comment } from '../types/Comment';

export type Props = {
  comments: Comment[],
  onDeleteComment(id: number): void,
};

export const CommentList: React.FC<Props> = ({ comments, onDeleteComment }) => {
  return (
    <>
      {(comments.length > 0) ? (
        <>
          <p className="title is-4">Comments:</p>

          {comments.map(comment => (
            <article
              className="message is-small"
              data-cy="Comment"
              key={comment.id}
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
                  onClick={() => onDeleteComment(comment.id)}
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
      ) : (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      )}
    </>
  );
};
