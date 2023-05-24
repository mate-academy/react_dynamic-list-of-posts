import React from 'react';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';

type Props = {
  postComments: Comment[] | [],
  commentToRemove: Comment | null,
  handleRemovingComment(comment: Comment): void,
  isRemovingComment: boolean,
};

export const CommentsList: React.FC<Props> = ({
  postComments,
  commentToRemove,
  handleRemovingComment,
  isRemovingComment,
}) => (
  <>
    {postComments.map(comment => (
      <article
        className="message is-small"
        data-cy="Comment"
        key={comment.id}
      >
        {isRemovingComment && commentToRemove === comment ? (
          <Loader />
        ) : (
          <>
            <div className="message-header">
              <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                {comment.name}
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
                onClick={() => handleRemovingComment(comment)}
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </>
        )}
      </article>
    ))}
  </>
);
