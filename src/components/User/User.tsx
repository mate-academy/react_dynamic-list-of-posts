import React from 'react';
import './User.css';

interface Props {
  person: User;
}

export const User: React.FC<Props> = ({ person: { name, email, address } }) => (
  <div className="user">
    <h3>
      <span>author: </span>
      { name }
    </h3>
    <p>
      <span>email: </span>
      { email }
    </p>
    <div>
      <p>adress:</p>
      <p>{address.street}</p>
      <p>{address.suite}</p>
      <p>{address.city}</p>
      <p>{address.zipcode}</p>
    </div>
  </div>
);
