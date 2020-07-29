import React from 'react';
import { UserProps } from '../types';

export const User: React.FC<UserProps> = ({ user }) => {
  if (user) {
    return (
      <div>
        <b>{user.name}</b>
        <br />
        <span>{user.email}</span>
        <br />
        <span>
          {user.address.city}
          ,
          {user.address.street}
          <i> st.</i>
          <br />
          {user.address.zipcode}
        </span>
      </div>
    );
  }

  return <></>;
};
