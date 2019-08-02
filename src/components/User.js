import React from 'react';

const User = ({ name, email, address }) => (
  <div>
    <div>{name}</div>
    <div>{email}</div>
    <address>
      <div>{address.city}</div>
      <div>{address.street}</div>
      <div>{address.zipcode}</div>
    </address>
  </div>
);

export default User;
