import React from 'react';

function User(props) {
  const user = props.users.find(user => user.id === props.userId);
  return (
    <div className="author">
      <span>{user.name}: </span>
      <span><a href={'mailto:'}>{user.email}</a></span>
      <p>from {user.address.city}</p>
    </div>
  )
}

export default User;
