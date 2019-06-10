import React from 'react';

function Comment(props) {
  const { comment } = props;

  return (
    <>
      <h4><i>{comment.name}</i></h4>
      <p>{comment.body}</p>
    </>
  );
}

export default Comment;
