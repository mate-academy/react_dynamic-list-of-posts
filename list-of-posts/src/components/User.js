import React from 'react';

function User(props) {
  let user = props.users.find(user => {
    return user.id === props.userId;
  });

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
