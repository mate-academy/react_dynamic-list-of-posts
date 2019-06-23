import React from "react";

function User(props) {
  return (
    <>
      <h3>{props.user.name}</h3>
      <a href={`mailto: ${props.user.email}`}>{props.user.email}</a>
    </>
  );
}

export default User;
