import React from 'react';

export default function Comment(props) {
  return (
    <div>
      <h3>{props.comments.name}</h3>
      <p>{props.comments.body}</p>
      <p>{props.comments.email}</p>
    </div>
  );
}
