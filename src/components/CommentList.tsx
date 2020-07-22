import React, { FC } from 'react';
import { Comment } from './Comment';

interface Props {
  commentsList: Comment[];
}

export const CommentList: FC<Props> = ({ commentsList }) => (
  <div className="border border-success box">
    {commentsList.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </div>
);
