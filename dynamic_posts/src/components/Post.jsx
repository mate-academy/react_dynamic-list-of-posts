import React from 'react';
import User from './User';

export default function Post(props) {
  const {title, body, user} = props;
  return (
    <>
      {title}
      <br />
      {body}
      <br />
      <User name={user.name} email={user.email} address={user.address} />
    </>
  )
}
