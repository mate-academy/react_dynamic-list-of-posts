import React from 'react';
import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';

type Props = {
  comments: Comment[];
  handleDelete: (id: number) => void;
};

export const CommentList: React.FC<Props> = ({ comments, handleDelete }) => {
  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => (
        <CommentItem
          comment={comment}
          handleDelete={handleDelete}
          key={comment.id}
        />
      ))}
    </>
  );
};
