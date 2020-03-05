import React, { FC } from 'react';
import { Comment } from '../Comment/Comment';

interface Props {
  comments: Comment[];
}

export const CommentList: FC<Props> = ({ comments }) => (
  <ul className="comments">
    {comments.map(item => (
      <li className="comment" key={item.id}>
        <Comment comment={item} />
      </li>
    ))}
  </ul>
);
