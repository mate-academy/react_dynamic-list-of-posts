import React, { useContext } from 'react';
import { CommentsContext } from '../store/CommentsContext';
import { CommentItem } from './CommentItem';

export const CommentsList: React.FC = () => {
  const { comments } = useContext(CommentsContext);

  return (
    <>
      {comments.map(comment => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </>
  );
};
