import React from 'react';
import { Comment } from './helpers/api';
import { CommentComponent } from './CommentComponent';

type Props = {
  comments: Comment[];
};

export const Comments: React.FC<Props> = ({ comments }) => {
  return (
    <div>
      {
        comments.map(comment => (
          <CommentComponent {...comment} />
        ))
      }
    </div>
  );
};
