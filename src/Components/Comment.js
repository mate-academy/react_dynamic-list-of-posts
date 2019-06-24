import React from 'react';

function Comment(props) {
  return (
    <>
      <li key={props.comment.id}>
          {props.comment.body}
          <p><span className="author">Author:</span> {props.comment.name}</p>
      </li>
    </>
  );
}

export default Comment;
