import React from 'react';
import { Comment } from '../Interface';
import { CommentItem } from './CommentItem';

interface Props {
  comments: Comment[];
}

export const CommentList: React.FC<Props> = ({ comments }) => (
  <ul>
    {comments.map((comment) => (
      <li key={comment.id}>
        <CommentItem {...comment} />
      </li>
    ))}
  </ul>
);
