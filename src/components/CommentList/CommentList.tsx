import React, { FC } from 'react';
import { Comment } from '../Comment/Comment';
import { CommentType } from '../../utils/interfaces';
import './CommentList.css';

interface Props {
  comments: CommentType[];
}

export const CommentList: FC<Props> = ({ comments }) => (
  <ul className="comments">
    {comments.map(comment => (
      <li key={comment.id} className="comments__item comment">
        <Comment comment={comment} />
      </li>
    ))}
  </ul>
);
