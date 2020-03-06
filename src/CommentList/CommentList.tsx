import React, { FC } from 'react';
import { Comment } from '../Comment/Comment';
import { CommentProps } from '../types';

import './CommentList.css';

interface Props {
  comments: CommentProps[];
}

export const CommentList: FC<Props> = ({ comments }) => (
  <ul className="comment-list">
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </ul>
);
