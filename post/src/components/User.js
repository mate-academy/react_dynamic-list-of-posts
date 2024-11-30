import React from 'react';

function User(props) {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.address}</p>
      <a href={"mailto:" + props.email}>{props.email}</a>
    </div>
  );
}

export default User;
