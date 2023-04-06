import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[] | null,
  isCommentDelete: boolean,
  onDeleteComment: (commentId: number) => void,
};

export const CommentsList: React.FC<Props> = ({
  comments,
  onDeleteComment,
  isCommentDelete,
}) => {
  return comments?.length ? (
    <>
      <p className="title is-4">Comments:</p>
      {comments.map(comment => (
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
      {isCommentDelete && (
        <div
          className="notification is-danger"
          data-cy="CommentsDeleteError"
        >
          Unable to delete comment. Try again!
        </div>
      )}
    </>
  ) : (
    <p className="title is-4" data-cy="NoCommentsMessage">
      No comments yet
    </p>
  );
};
