
import React from 'react';
import { UserType } from './interfaces';


export const User: React.FC<UserType> = (props) => {
  const { name, email, address } = props;

  return (
    <>
      <strong>{name}</strong>
      &nbsp;
      <span>{email}</span>
      &nbsp;
      <span>
        {address.suite}
        {address.street}
        {address.city}
      </span>

    </>
  );
};
