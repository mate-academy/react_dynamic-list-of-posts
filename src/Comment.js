import React from 'react';
import './comment.css';

const Comment = ({ commentData }) => (
  <div>
      <div className="comment" key={commentData.id}>
        <p className="comment_name">{commentData.name}</p>
        <p className="comment_body">{commentData.body}</p>
        <p className="comment_email">{commentData.email}</p>
      </div>
  </div>
);

export default Comment;
