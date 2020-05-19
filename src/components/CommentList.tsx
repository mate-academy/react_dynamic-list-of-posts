import React from 'react';
import { IComment } from '../helpers/interfaces';
import { CommentCard } from './CommentCard';

type Props = {
  comments: IComment[];
};

export const CommentList: React.FC<Props> = ({ comments }) => (
  <ul>
    {comments.map(comment => (
      <li key={comment.id}>
        <CommentCard comment={comment} />
      </li>
    ))}
  </ul>
);
