import React from 'react';
import { Comment } from '../types/Comment';
import { CommentInfo } from './CommentInfo';

type Props = {
  comments: Comment[];
  handleDeleteComment: (id: number) => void;
};

export const CommentsList: React.FC<Props> = ({
  comments,
  handleDeleteComment,
}) => {
  return (
    <>
      <p className="title is-4">Comments:</p>
      {comments.map(comment => (
        <CommentInfo
          key={comment.id}
          comment={comment}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </>
  );
};
