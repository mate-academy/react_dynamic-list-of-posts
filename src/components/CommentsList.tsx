import React from 'react';
import { Comment } from '../types/Comment';

interface Props {
  comments: Comment[] | null;
  onDelete: (comment: Comment) => Promise<unknown>;
}

export const CommentsList: React.FC<Props> = ({ comments, onDelete }) => {
  return (
    <React.Fragment>
      {comments?.map(comment => (
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
              onClick={() => onDelete(comment)}
            >
              delete button
            </button>
          </div>

          <div className="message-body" data-cy="CommentBody">
            {comment.body}
          </div>
        </article>
      ))}
    </React.Fragment>
  );
};
