import React from 'react';
import User from './User'

export default function Comment(props) {
  const {name, email, body} = props;
  return (
    <span>
      <User name={name} email={email} />
      <br />
      {body}
      <br />
      <hr />
    </span>
  )
}
