import React from 'react';
import { User } from '../../Helpers/api';
import './UserCard.css';

type Props = {
  user?: User;
};

export const UserCard: React.FC<Props> = ({ user }) => {
  const name = user?.name;
  const email = user?.email;
  const address = user?.address;

  const street = address?.street;
  const suite = address?.suite;
  const city = address?.city;
  const zipcode = address?.zipcode;

  return (
    <div className="post__user">
      <div className="post__user-name">
        <p>{name}</p>
        <p>{email}</p>
      </div>
      <div className="post__user-address">
        <p>{street}</p>
        <p>{suite}</p>
        <p>{city}</p>
        <p>{zipcode}</p>
      </div>
    </div>
  );
};
