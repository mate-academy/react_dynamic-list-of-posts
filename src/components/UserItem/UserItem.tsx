import React, { FC } from 'react';
import { User } from '../../interfaces';

interface Props {
  user: User;
}

export const UserItem: FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <div
      className="card-header"
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <div>{ name }</div>
      <div>{ email }</div>
    </div>
  );
};
