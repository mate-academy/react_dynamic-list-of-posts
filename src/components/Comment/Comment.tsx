import React from 'react';
import './Comment.css';
import { Comments } from '../../helpers/api';

const Comment: React.FC<Comments> = ({ name, body, email }) => (
  <div className="post__comments-list_comment">
    <p className="post__comments-list_comment-name">
      {name}
    </p>
    <p className="post__comments-list_comment-email">
      {email}
    </p>
    <p className="post__comments-list_comment-body">
      {body}
    </p>
  </div>
);

export default Comment;
