import React from 'react';
import './Comment.css';

const Comment = ({ name, email, body }) => (
  <div className="comment border border-dark rounded bg-info">
    <div className={'commentText'}>{name}</div>
    <div className={'commentText'}>{email}</div>
    <div className={'commentText'}>{body}</div>
  </div>
);

export default Comment;
