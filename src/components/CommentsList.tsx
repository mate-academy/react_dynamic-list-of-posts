import React from 'react';
import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';

type CommentsListType = {
  comments: Comment[];
  deleteComment: (commentId: number) => void;
};

export const CommentsList: React.FC<CommentsListType> = ({
  comments,
  // tempComment,
  deleteComment,
}) => {
  return (
    <>
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          deleteComment={deleteComment}
        />
      ))}
    </>
  );
};
