import React from 'react';
import './Comment.css';

const Comment = ({ name, email, body }) => (
  <div className="comment border border-dark rounded bg-info">
    <p className="commentText">{name}</p>
    <p className="commentText">{email}</p>
    <p className="commentText">{body}</p>
  </div>
);

export default Comment;
