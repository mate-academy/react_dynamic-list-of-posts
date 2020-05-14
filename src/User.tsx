
import React from 'react';
import { UserPropsType } from './interfaces';


export const User: React.FC<UserPropsType> = (props) => {
  const { name, email, address } = props.user;

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
