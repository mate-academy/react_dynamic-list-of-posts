import React, { FC } from 'react';
import { User } from '../../interfaces';

interface Props {
  user: User;
}

export const UserItem: FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <div className="card-header">
      <div>{ name }</div>
      <div>{ email }</div>
    </div>
  );
};
