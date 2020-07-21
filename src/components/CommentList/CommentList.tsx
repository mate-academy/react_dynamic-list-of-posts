import React from 'react';
import { Comment } from '../Comment/Comment';

type CommentListProps = {
  comments: Comment[];
};

export const CommentList: React.FC<CommentListProps> = (props) => {
  const { comments } = props;

  return (
    <>
      {comments.map((currentComment) => (
        <Comment comment={currentComment} key={currentComment.id} />
      ))}
    </>
  );
};
