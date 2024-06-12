import React from 'react';
import './Comment.css';

function Comment(props) {
  const { title, body } = props;
  return (
    <div>
      <h4>{title}</h4>
      <span className="comment-body">{body}</span>
    </div>
  );
}

export default Comment;
