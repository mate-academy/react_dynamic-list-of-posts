import React from 'react';
import { IUser } from '../helpers/interfaces';

interface Props {
  user: IUser;
}

export const User: React.FC<Props> = ({ user }) => {
  const address = (
    ` ${user.address.city}
  ${user.address.street}
  ${user.address.suite}
  ${user.address.zipcode}`
  );

  return (
    <div>
      <h2>
        {user.name}
      </h2>
      <p>
        {address}
      </p>
      <p>
        {user.email}
      </p>
    </div>
  );
};
