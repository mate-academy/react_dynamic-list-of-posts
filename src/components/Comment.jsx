import React from 'react';
export default function Comment(props) {
  return (
    <div className="comment">
      <div>
        <a href={`mailto:${props.comment.email}`}>
          {props.comment.name}</a>
        <p>{props.comment.body}</p>
      </div>
    </div>
  )
}
