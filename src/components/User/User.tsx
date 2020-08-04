import React, { FC } from 'react';
import { User } from '../../interfaces';

interface Props {
  user: User;
}

export const UserItem: FC<Props> = ({ user }) => {
  const { name, email, address } = user;

  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
      <AddressItem content={address} />
    </div>
  );
};
