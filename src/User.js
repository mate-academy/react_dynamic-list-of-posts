import React from 'react';

function User(props) {
  return (
  <div className="user">
    <p> {props.user.name} </p>
  <p> {props.user.email} </p>
  <p> {`${props.user.address.city} ${props.user.address.street}`}</p>
  </div>
  );
}

export default User;
