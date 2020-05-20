import React from 'react';
import { Commentary } from './Commentary';
import { Comment } from '../helpers/typeDefs';

type Props = {
  comments: Comment[];
};


export const CommentList: React.FC<Props> = ({ comments }) => (
  <div className="comments">
    <span>Comments:</span>
    {comments.map(comment => (
      <div key={comment.id}>
        <Commentary {...comment} />
      </div>
    ))}
  </div>
);
