import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[] | null,
  onHandleDeleteComment: (id: number) => void,
};

export const CommentsList: React.FC<Props> = ({
  comments,
  onHandleDeleteComment,
}) => {
  return comments?.length ? (
    <>
      <p className="title is-4">Comments:</p>
      {comments?.map(comment => (
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
              onClick={() => onHandleDeleteComment(comment.id)}
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
  );
};
