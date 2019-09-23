import React from 'react';
import './User.scss';

function User({ user }) {
  const {
    name, username, email, address,
  } = user;

  return (
    <div className="user">
      <h2>{name}</h2>
      <p>{username}</p>
      <p>{email}</p>
      {address && (
        <div className="user__adress">
          <p className="user__adress-street">{address.street}</p>
          <p className="user__adress-suite">{address.suite}</p>
          <p className="user__adress-city">{address.city}</p>
          <p className="user__adress-zipcode">{address.zipcode}</p>
        </div>
      )}
    </div>
  );
}

export default User;
