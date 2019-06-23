import React from "react";
import Comment from "./Comment";
import "../css/Comments.css";

function CommentList(props) {
  return (
    <div className="comments">
      {props.comments.map(comment => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default CommentList;
