import React from "react";
import "../css/Comment.css";

function Comment(props) {
  return (
    <div className="comment">
      <h4>{props.comment.name}</h4>
      <p>{props.comment.body}</p>
      <a href={`mailto: ${props.comment.email}`}>
        {props.comment.email}
      </a>
    </div>
  );
}

export default Comment;
