import React from 'react';
import './comment.css';

const Comment = ({ commentData }) => (
  <div>
    {commentData.map(comment => (
      <div className="comment" key={comment.id}>
        <p className="comment_name">{comment.name}</p>
        <p className="comment_body">{comment.body}</p>
        <p className="comment_email">{comment.email}</p>
      </div>
    ))
    };
  </div>
);

export default Comment;
