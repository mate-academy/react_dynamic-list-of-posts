import React from 'react';

const User = ({ name, email, address }) => (
  <div className="user">
    <p>User name: {name}</p>
    <p>User email: {email}</p>
    {address && (
      <p>User city: {address.city}</p>
    )}
  </div>
)

export default User;