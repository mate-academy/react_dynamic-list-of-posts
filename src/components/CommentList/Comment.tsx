import React, { FC } from 'react';
import './Comment.css';

interface Props {
  comment: Comment;
}

export const Comment: FC<Props> = ({ comment }) => {
  return (
    <div className="comment">
      <h3 className="comment__name">{comment.name}</h3>
      <p className="comment__email">{comment.email}</p>
      <p className="comment__text">{comment.body}</p>
    </div>
  );
};
