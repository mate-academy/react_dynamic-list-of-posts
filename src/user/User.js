import React from "react";
import "../user/User.css";

const User = ({ user }) => {
  return (
    <>
      <h3 className="user-title">Author</h3>
      <p className="user">
        <span className="highlitedText">{user.name}</span>,{" "}
        {`<${user.username}>`}, {user.address.zipcode}, {user.address.city},{" "}
        {user.address.street}, {user.address.suite}
      </p>
    </>
  );
};

export default User;
