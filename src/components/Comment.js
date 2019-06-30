import React from 'react';
import User from './User';

export default function Comment(props) {
  const { name, email, body } = props;
  return (
    <div className="comment">
      <User name={name} email={email}/>
      <p>comment: {body}</p>
    </div>
  )
}
