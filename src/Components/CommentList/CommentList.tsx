import React from 'react';
import { Comment } from '../Comment/Comment';

type Props = {
  comments: CommentType[];
};

export const CommentList: React.FC<Props> = ({ comments }) => (
  <ul>
    {comments.map(comment => (
      <li key={comment.id}>
        <Comment comment={comment} />
      </li>
    ))}
  </ul>
);
