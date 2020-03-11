import React, { FC } from 'react';
import { Comment } from '../Comment/Comment';

interface Props {
  comments: CommentInterface[];
}

export const CommentList: FC<Props> = ({ comments }) => {
  return (
    <ul>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};
