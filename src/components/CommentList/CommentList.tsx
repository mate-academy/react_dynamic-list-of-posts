import React, { FC } from 'react';
import { Comment } from '../../interfaces';
import { CommentItem } from '../CommentItem/CommentItem';

interface Props {
  comments: Comment[];
}

export const CommentList: FC<Props> = ({ comments }) => {
  return (
    <div>
      {
        comments.map(comment => <CommentItem content={comment} />)
      }
    </div>
  );
};
