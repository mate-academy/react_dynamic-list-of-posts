import React from 'react'

export default function User(props) {
  const {name, email, address} = props;
  return (
    <div className="user">
      <p>name: {name}</p>
      <p>email: {email}</p>
      <p>{address ? `address: ${address.city }` : null}</p>
    </div>
  );
}

