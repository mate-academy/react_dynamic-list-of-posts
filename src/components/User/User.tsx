import React, { FC } from 'react';

import './User.css';

interface Props {
  user: User;
}

export const User: FC<Props> = ({ user }) => {
  const { name, email, address } = user;

  return (
    <div className="user">
      <>
        <p>{name}</p>
        <p>{email}</p>
        <p>{address.city}</p>
      </>
    </div>
  );
};
