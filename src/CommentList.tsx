import React from 'react';
import { Comment } from './Comment';

type PropsComment = {
  comments: Comment[];
};

export const CommentList: React.FC<PropsComment> = ({ comments }) => {
  return (
    <>
      <h2>Comments</h2>
      {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
    </>
  );
};
