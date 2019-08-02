import React from 'react';
import './Comment.css';

const Comment = ({ name, email, body }) => (
  <div className="comment">
    <div>{name}</div>
    <div>{email}</div>
    <div>{body}</div>
  </div>
);

export default Comment;
