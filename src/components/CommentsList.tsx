import React from 'react';
import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';

interface Props {
  comments: Comment[];
  deleteComment: (commentId: number) => Promise<void>;
}

export const CommentsList: React.FC<Props> = ({ comments, deleteComment }) => {
  return (
    <>
      <p className="title is-4">Comments:</p>

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
