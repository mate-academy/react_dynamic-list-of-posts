import React, { FC } from 'react';
import { CommentItem } from '../CommentItem/CommentItem';

interface Props {
  comments: Comment[];
}

export const CommentList: FC<Props> = ({ comments }) => {

  return (
    <>
      {
        comments.map(comment => (
          <CommentItem comments={comment} key={comment.id} />
        ))
      }
    </>
  );
};
