import React from 'react';

function Comment({comment}) {
  const {name, email, body} = comment;

  return (
    <div className="comment">
      <div>{body}</div>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  );
}

export default Comment;
