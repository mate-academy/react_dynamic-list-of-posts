import React from "react";
import Comment from "./Comment";
import "../comments/Comment.css";

const CommentList = ({ comments }) => {
  return (
    <div className="commentlist">
      <h3>Comments</h3>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
