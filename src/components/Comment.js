import React from 'react';

function Comment(props) {
  return (
    <div className='comments'>
      <div>{props.name}</div>
      <div><a href={props.commentEmail}>{props.commentEmail}</a></div>
      <p>{props.commentText}</p>
    </div>
  );
}

export default Comment;
