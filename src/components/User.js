import React from 'react';

function User(props) {
  const { user } = props;
  return (
    <a href={`mailto:${user.email}`}>{user.name}</a>
  );
}

export default User;
