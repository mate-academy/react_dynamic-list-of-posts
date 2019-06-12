import React from 'react';

function User(props) {
  return (
    <p>
      <span>{props.author.name}</span>, 
      email: {props.author.email},
      Address: {props.author.address.street}, {props.author.address.suite}, {props.author.address.city}
    </p>
  )
}

export default User;
