import React, { useState } from 'react';
import { CommentsListItem } from './CommentsListItem';
import { Comment } from '../types/Comment';
import { HandleCommentDelete } from '../types/handlers';

type Props = {
  comments: Comment[];
  onCommentDelete: HandleCommentDelete;
};

export const CommentsList = React.memo(
  ({ comments, onCommentDelete }: Props) => {
    const [error, setError] = useState(false);

    const handleCommentDeleteClick = async (commentId: number) => {
      setError(false);
      setError(!(await onCommentDelete(commentId)));
    };

    return (
      <>
        <p className="title is-4">Comments:</p>

        {comments.map(comment => (
          <CommentsListItem
            key={comment.id}
            comment={comment}
            onCommentDeleteClick={handleCommentDeleteClick}
          />
        ))}

        {error && (
          <div className="notification is-danger">Something went wrong</div>
        )}
      </>
    );
  },
);

CommentsList.displayName = 'CommentsList';
