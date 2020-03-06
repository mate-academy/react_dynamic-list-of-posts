import React, { FC } from 'react';

interface Props {
  user: UserInterface;
}

export const User: FC<Props> = ({ user }) => {
  const { username, email, address } = user;
  const { city } = address;

  return (
    <div className="user">
      <p>{username}</p>
      <p>{email}</p>
      <p>{city}</p>
    </div>
  );
};
