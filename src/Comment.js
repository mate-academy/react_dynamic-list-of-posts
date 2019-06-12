import React from 'react';

function Comment(props) {
  return (
  <div className="comment">
    <h3> {props.comment.name} </h3>
  <p> {props.comment.email} </p>
  <p> {props.comment.body} </p>
  </div>
  );
}

export default Comment;

