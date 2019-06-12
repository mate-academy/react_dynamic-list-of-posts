import React from 'react';
import './User.css';

function User(props) {
  const { name, email, address } = props;
  return (
    <div>
      <span className="user-name">{name}</span>
      <span className="user-email">{email}</span>
      <span className="user-info">{address.suite} {address.street} {address.city} {address.zipcode}</span>
    </div>
  );
}

export default User;
