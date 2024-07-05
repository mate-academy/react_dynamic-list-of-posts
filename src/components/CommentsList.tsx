import React, { useState } from 'react';
import { CommentsListItem } from './CommentsListItem';
import { Comment } from '../types/Comment';
import { HandleCommentDelete } from '../types/handlers';
import { Notification } from './Notification';
import { wentWrongMessage } from '../utils/strings/messages';

type Props = {
  comments: Comment[];
  onCommentDelete: HandleCommentDelete;
};

export const CommentsList = React.memo(
  ({ comments, onCommentDelete }: Props) => {
    const [error, setError] = useState(false);

    const handleCommentDeleteClick = async (commentId: number) => {
      setError(false);

      try {
        await onCommentDelete(commentId);
      } catch {
        setError(true);
      }
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

        {error && <Notification message={wentWrongMessage} error />}
      </>
    );
  },
);

CommentsList.displayName = 'CommentsList';
