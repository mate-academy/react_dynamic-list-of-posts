import React from "react";
import "../comments/Comment.css";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      (<span className="highlitedText">{comment.name}</span>, {comment.email})
      <br />
      {comment.body}
    </div>
  );
};

export default Comment;
