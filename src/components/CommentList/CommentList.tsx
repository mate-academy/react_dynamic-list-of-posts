import React, { FC } from 'react';

interface Props {
  comments: Comment[];
}

export const CommentList: FC<Props> = ({ comments }) => {
  return (
    <div>
      {
        comments.map(comment => <Comment content={comment} />)
      }
    </div>
  );
};
