import React, { FC } from 'react';

interface Props {
  user: UserInterface;
}

export const User: FC<Props> = ({ user }) => {
  const { name, address, email } = user;

  return (
    <>
      <p>
        {name}
      </p>
      <p>
        {address.city}
        <br />
        {address.street}
      </p>
      <a href={email}>
        {email}
      </a>
    </>
  );
};
