import React, { FC } from 'react';
import { Comment } from '../../interfaces';
import { CommentItem } from '../CommentItem/CommentItem';

interface Props {
  comments: Comment[];
}

export const CommentList: FC<Props> = ({ comments }) => {
  return (
    <div className="card text-white bg-primary mb-3">
      <div className="card-header">Comments</div>
      <div className="card-body">
        {
          comments.map(comment => <CommentItem content={comment} />)
        }
      </div>
    </div>
  );
};
