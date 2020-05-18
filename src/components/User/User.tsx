import React from 'react';
import './User.css';

export const User: React.FC<User> = ({ name, email, address }) => (
  <div className="posts__user">
    <span className="posts__user-name">
      {`Name: ${name}`}
    </span>
    <a href={`mailto:${email}`} className="posts__user-email">
      {email}
    </a>
    <p className="posts__user-address">
      <span>{`city: ${address.city}`}</span>
      <span>{`street: ${address.street}`}</span>
      <span>{`suite: ${address.suite}`}</span>
      <span>{`zip: ${address.zipcode}`}</span>
    </p>
  </div>
);
