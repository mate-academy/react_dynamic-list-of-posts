import React, { FC } from 'react';
import { UserType } from '../../utils/interfaces';
import './User.css';

interface Props {
  user: UserType;
}

export const User: FC<Props> = ({ user }) => {
  const { name, email, address } = user;
  const { street, city } = address;

  return (
    <div className="user">
      <span className="user__name">{name}</span>
      <span className="user__email">{email}</span>
      <div className="user__address">
        <span className="user__street">{`${street} str., `}</span>
        <span className="user__city">{city}</span>
      </div>
    </div>
  );
};
