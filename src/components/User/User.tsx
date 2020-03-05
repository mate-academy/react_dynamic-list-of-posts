import React, { FC } from 'react';
import { UserInterface } from '../../types';

import './User.css';

interface Props {
  user: UserInterface
}

export const User: FC<Props> = ({ user }) => {
  const { name, email, address } = user;
  const { city } = address;

  return (
    <div className="user_info">
      <span>{`${name} -`}</span>
      <span>{`${email} -`}</span>
      <span>{`${city} -`}</span>
    </div>
  );
};
