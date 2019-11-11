import React from 'react';

function User({user}) {
  const {email, name} = user;

  return (
    <div className="user">
      <div>{name}</div>
      <div>{email}</div>
      <div>{user.address.city}</div>
    </div>
  );
}

export default User;
