import React, { FC } from 'react';
import { Comment } from '../Comment/Comment';
import { CommentInterface } from '../../types';

import './Comments.css';

interface Props {
  comments: CommentInterface[]
}

export const Comments: FC<Props> = ({ comments }) => (
  <ul className="comments">
    {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
  </ul>
);
