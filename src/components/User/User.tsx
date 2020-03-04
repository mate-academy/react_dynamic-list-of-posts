import React, { FC } from 'react';
import './User.css';
import { UserType } from '../../utils/interfaces';

interface Props {
  user: UserType;
}

export const User: FC<Props> = (user) => {
  const {
    user: {
      name,
      email,
      address: {
        street,
        suite,
        city,
        zipcode,
      },
    },
  } = user;

  return (
    <div className="user">
      <h3>{name}</h3>
      <p>{email}</p>
      <address>
        <span>
          {`${zipcode}, ${city}, ${street}, ${suite}`}
        </span>
      </address>
    </div>
  );
};
