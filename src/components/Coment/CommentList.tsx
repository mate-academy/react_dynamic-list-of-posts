import React, { FC } from 'react';
import { Comment } from './Comment';

interface Props {
  comments: CommentInterface[];
}

export const CommentList: FC<Props> = ({ comments }) => {
  return (
    <>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};
