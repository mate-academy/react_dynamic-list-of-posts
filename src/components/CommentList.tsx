import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  postComments: Comment[] | null | undefined;
  deleteComment: (comment: Comment) => void
};

export const CommentList: React.FC<Props> = ({
  postComments,
  deleteComment,
}) => {
  return (
    <>
      { postComments?.length === 0 ? (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      ) : (
        <>
          <p className="title is-4">Comments:</p>
          {postComments?.map(comment => (
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
                  onClick={() => {
                    deleteComment(comment);
                  }}
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
      ) }
    </>
  );
};
