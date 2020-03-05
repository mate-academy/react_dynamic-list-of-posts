import React, { FC } from 'react';

import { User as UserInterface } from '../constants/types';
import './User.css';

interface Props {
  user: UserInterface;
}


export const User: FC<Props> = (props) => {
  const { user } = props;
  const { name, email, address } = user;
  const { zipcode, street, city } = address;

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
