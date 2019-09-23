import React from 'react';
import './Comment.scss';

function Comment({ comment }) {
  const { name, email, body } = comment;

  return (
    <div className="comment">
      <h4>{name}</h4>
      <p>{email}</p>
      <p>{body}</p>
    </div>
  );
}

export default Comment;
