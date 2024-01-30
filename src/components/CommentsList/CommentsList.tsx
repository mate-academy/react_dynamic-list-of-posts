import React from 'react';
import { CommentItem } from '../CommentItem/CommentItem';
import { Comment } from '../../types/Comment';

type Props = {
  setIsLoading: (v: boolean) => void;
  setShowForm: (v: boolean) => void;
  setErrorMessage: (v: string) => void;
  errorMessage: string;
  comments: Comment[];
  setComments: (v: Comment[]) => void;
};

export const CommentsList: React.FC<Props> = React.memo(({
  errorMessage,
  comments,
}) => {
  return (
    (
      <div className="wrapper">
        {errorMessage && (
          <div
            className="notification is-danger"
            data-cy="CommentsError"
          >
            {errorMessage}
          </div>
        )}

        {!comments.length && !errorMessage
          ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )
          : (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentItem
                  comment={comment}
                  key={comment.id}
                />
              ))}
            </>
          )}
      </div>
    )
  );
});
