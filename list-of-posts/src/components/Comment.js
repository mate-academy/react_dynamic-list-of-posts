import React from 'react';

function Comment(props) {
  return (
    <div>
      <h3>Comment</h3>
      <p><a href={'mailto: ' + props.authorEmail}>{props.authorName}</a></p>
      <p>{props.comment}</p>
    </div>
  )
}

export default Comment;
