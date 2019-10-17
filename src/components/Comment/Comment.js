import React from 'react';
import './Comment.css';

const Comment = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <div className="comment">
      <div className="comment__name">
        { name.charAt(0).toUpperCase() + name.slice(1) }
      </div>
      <div className="comment__body">
        { body.charAt(0).toUpperCase() + body.slice(1) }
      </div>
      <div className="comment__email">
        { email.charAt(0).toUpperCase() + email.slice(1) }
      </div>
    </div>
  );
};

export default Comment;
