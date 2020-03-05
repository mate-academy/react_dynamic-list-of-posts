import React, { FC } from 'react';

interface Props {
  user: User;
}

export const User: FC<Props> = ({ user }) => {
  const { name, email, address } = user;
  const { city } = address;

  return (
    <div className="user">
      <p>{`author: ${name}`}</p>
      <p>{`e-mail: ${email}`}</p>
      <p>{`address: ${city}`}</p>
    </div>
  );
};
