import React from 'react';

import './Comment.css';
import User from '../User/User';

const Comment = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <div className="comment-list__item">
      <p>{body}</p>
      <User name={name} email={email} />
    </div>
  );
}

export default Comment;
