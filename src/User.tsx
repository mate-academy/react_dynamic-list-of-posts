import React from 'react';

type UserProps = {
  user: User;
};

export const User: React.FC<UserProps> = ({ user }) => {
  const { name, email, address } = user;

  return (
    <div className="post__user">
      <p>{name}</p>
      <p>{email}</p>
      <p>{address.street}</p>
      <p>{address.suite}</p>
      <p>{address.city}</p>
      <p>{address.zipcode}</p>
    </div>
  );
};
