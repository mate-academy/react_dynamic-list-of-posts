import React from "react";
import '../App.css';

const Comment = ({comment}) => (
  <div className="comment">
    <span className="comment-email">{comment.email} </span>
    <span className="comment-body">{comment.body}</span>
  </div>
)

export default Comment;