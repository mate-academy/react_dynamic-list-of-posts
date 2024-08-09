import React from 'react';
import { useValues } from '../SharedContext';
import { CommentsListItem } from './CommentsListItem';

export const CommentsList = React.memo(() => {
  const { comments } = useValues();

  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments?.map(comment => (
        <CommentsListItem key={comment.id} comment={comment} />
      ))}
    </>
  );
});

CommentsList.displayName = 'CommentsList';
