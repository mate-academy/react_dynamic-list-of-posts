import React, { useContext } from 'react';
import { CommentItem } from './CommentItem';
import { CommentsContext } from './CommentContext';

export const CommentsList: React.FC = () => {
  const { comments } = useContext(CommentsContext);

  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => (
        <CommentItem item={comment} key={comment.id} />
      ))}
    </>
  );
};
