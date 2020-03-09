import React, { FC } from 'react';

interface Props {
  user: UserInterface;
}

export const User: FC<Props> = ({ user }) => (
  <>
    <p>
      {user.name}
    </p>
    <p>
      {user.address.city}
      <br />
      {user.address.street}
    </p>
    <a href={user.email}>
      {user.email}
    </a>
  </>
);
