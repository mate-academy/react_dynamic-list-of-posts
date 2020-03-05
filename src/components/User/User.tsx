import React, { FC } from 'react';
import { UserInterface } from '../../constants/types';

interface Props {
  user: UserInterface;
}

export const User: FC<Props> = ({ user }) => {
  return (
    <div className="user">
      <p>Contact info:</p>
      <p>{`name: ${user.name}, email: ${user.email}`}</p>
      <p>{`address: ${user.address.zipcode}, ${user.address.street}, ${user.address.city}`}</p>
    </div>
  );
};
