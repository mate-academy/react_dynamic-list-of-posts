import React, { FC } from 'react';
import { Comment } from './Comment';

interface Props {
  comments: Comment[];
}

export const CommentList: FC<Props> = ({ comments }) => (
  <>
    {comments.map(comment => <Comment key={comment.id} {...comment} />)}
  </>
);
