import React, { FC } from 'react';
import { Comment } from '../Comment/Comment';
import { Comment as Comments } from '../types';

import './CommentList.css';

interface Props {
  comments: Comments[];
}

export const CommentList: FC<Props> = ({ comments }) => (
  <ul className="comment-list">
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </ul>
);
