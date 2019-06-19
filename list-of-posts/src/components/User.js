import React from 'react';

function User(props) {
  const user = props.users.find(user => user.id === props.userId);
  return (
    <div>
      <h3>Author</h3>
      <p>{user.name}</p>
      <p><a href={'mailto:'}>{user.email}</a></p>
      <p>{user.address.city}</p>
    </div>
  )
}

export default User;
