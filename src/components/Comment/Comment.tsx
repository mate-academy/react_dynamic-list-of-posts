import React from 'react';
import './Comment.css';

export const Comment: React.FC<Comment> = ({ name, body, email }) => (
  <p className="posts__comment">
    <span className="posts__comment-name">{name}</span>
    <a href={`mailto:${email}`} className="posts__comment-email">{email}</a>
    <span className="posts__comment-text">{body}</span>
  </p>
);
