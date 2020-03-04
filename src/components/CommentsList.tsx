import React, { FC } from 'react';

import { CommentItem } from './CommentItem';

import { Comment } from '../constants/types';

interface Props {
  comments: Comment[];
}


export const CommentsList: FC<Props> = (props) => {
  const { comments } = props;

  return (
    <ol>
      {comments.map(comment => (
        <li key={comment.id}>
          <CommentItem comment={comment} />
        </li>
      ))}
    </ol>
  );
};
