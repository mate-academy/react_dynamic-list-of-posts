import React, { FC } from 'react';
import { Comment } from './Comment';

interface Props {
  comments: Comment[];
}

export const CommentsList: FC<Props> = ({ comments }) => (
  <ul className="list-group">
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </ul>
);
