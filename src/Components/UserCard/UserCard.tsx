import React from 'react';
import { User } from '../../Helpers/api';
import './UserCard.css';

type Props = {
  user: User,
}

export const UserCard: React.FC<Props> = ({ user: { name, email, address }}) => {
  const { street, suite, city, zipcode } = address;

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
}