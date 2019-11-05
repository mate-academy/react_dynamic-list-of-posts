import React from 'react';

const User = ({ name, email, address: { city, street, zipcode } }) => (
  <div>
    <p>{name}</p>
    <p>{email}</p>
    <address>
      <p>{city}</p>
      <p>{street}</p>
      <p>{zipcode}</p>
    </address>
  </div>
);

export default User;
