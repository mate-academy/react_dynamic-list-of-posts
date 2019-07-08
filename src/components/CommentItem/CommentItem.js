import React from 'react';

import User from "../User/User";
import './CommentItem.css';

const CommentItem = ({ comment }) => {
  return (
    <div className="comments__item">
      <User user={{ name: comment.name }} />
      <p className="comments__item__body">{comment.body}</p>
    </div>
  );
};

export default CommentItem;
