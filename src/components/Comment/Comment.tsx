import React from 'react';
import './Comment.css';
import { Comment } from '../../helpers/api';

const CommentItem: React.FC<Comment> = ({ name, body, email }) => (
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

export default CommentItem;
