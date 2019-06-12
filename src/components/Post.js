import React from 'react';
import User from './User';

export default function Post(props) {
  return (
    <div className="article">
      <h2>{props.post.title}</h2>
      <User author={props.post.user} />
      <p>{props.post.body}</p>
    </div>
  );
}
