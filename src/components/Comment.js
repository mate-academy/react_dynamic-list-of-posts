import React from 'react';

function Comment(props) {
  return (
    <div className="comment">
      <p>{props.comment.name}, <i>{props.comment.email}</i></p>
      <p>{props.comment.body}</p>
    </div>
  );
}

export default Comment;
