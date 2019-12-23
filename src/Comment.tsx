import React from 'react';
import { Comment } from './interfaces';

interface Props {
  comment: Comment;
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
