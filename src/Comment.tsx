import React from 'react';
import { CommentInterface } from './interfaces';

interface Props {
  comment: CommentInterface;
}

const Comment: React.FC<Props> = ({ comment }) => (
  <div className="comments__item">
    <p className="comments__text">{comment.body}</p>
    <div className="comments__author">
      <span>{comment.name}</span>
      <br />
      <span>{comment.email}</span>
    </div>
  </div>
);

export default Comment;
