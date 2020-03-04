import React, { FC } from 'react';

import { Address } from '../constants/types';
import './User.css';

interface Props {
  name: string;
  email: string;
  address: Address;
}


export const User: FC<Props> = (props) => {
  const { name, email, address: { zipcode, street, city } } = props;

  return (
    <p className="user">
      <span>
        <b>Name:</b>
        {' '}
        {name}
      </span>
      <span>
        <b>Email:</b>
        {' '}
        {email}
      </span>
      <span>
        <b>Address:</b>
        {' '}
        {`${city} / ${street} / ${zipcode}`}
      </span>
    </p>
  );
};
