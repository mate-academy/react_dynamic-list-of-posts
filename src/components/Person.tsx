import React, { FC } from 'react';
import { User } from '../interfaces';

interface Props {
  user: User;
}


export const Person: FC<Props> = ({ user }) => {
  const {
    street,
    suite,
    city,
    zipcode,
  } = user.address;

  const { name, email } = user;

  return (
    <>
      <div className="person">
        <h3>{name}</h3>
        <p>{email}</p>
        <ul className="person__address-list">
          <li>{street}</li>
          <li>{suite}</li>
          <li>{city}</li>
          <li>{zipcode}</li>
        </ul>
      </div>
    </>
  );
};
