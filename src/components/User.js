import React from 'react';

const User = ({ name, email, address: { city, street, zipcode } }) => (
  <div>
    <div>{name}</div>
    <div>{email}</div>
    <address>
      <div>{city}</div>
      <div>{street}</div>
      <div>{zipcode}</div>
    </address>
  </div>
);

export default User;
