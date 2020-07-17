import React, { FC } from 'react';
import { CommentInterface } from '../../interfaces';
import { Comment } from '../Comment/Comment';
import './CommentList.css';

interface CommentListProps {
  commentList: CommentInterface[];
}

export const CommentList: FC<CommentListProps> = ({ commentList }) => (
  <ul className="post__comments comments">
    {commentList.map(comment => (
      <li key={comment.id} className="comment__item">
        <Comment comment={comment} />
      </li>
    ))}
  </ul>
);
