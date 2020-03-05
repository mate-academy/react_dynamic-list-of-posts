import React, { FC } from 'react';
import { Comment } from './Comment';

interface Props {
  comments: Comments;
}

export const CommentList: FC<Props> = ({ comments }) => {
  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
