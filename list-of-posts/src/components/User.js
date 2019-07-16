import React from 'react';

function User(props) {
  const user = props.users.find(user => user.id === props.userId);
  return (
    <div className="author">
      <p>author: {user.name}</p>
      <p>email: <a href={'mailto:'}>{user.email}</a></p>
      <p>city: {user.address.city}</p>
    </div>
  )
}

export default User;
