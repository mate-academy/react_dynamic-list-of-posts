import React from 'react';
import { IComment } from '../helpers/interfaces';

interface Props {
  comment: IComment;
}

export const CommentCard: React.FC<Props> = ({ comment }) => (
  <div>
    <h2>
      {comment.name}
    </h2>
    <p>
      {comment.body}
    </p>
    <p>
      {comment.email}
    </p>
  </div>
);
