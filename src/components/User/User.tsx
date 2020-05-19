import React from 'react';
import './User.css';

export const User: React.FC<User> = ({
  name, email, address: {
    city, street, suite, zipcode,
  },
}) => (
  <div className="posts__user">
    <span className="posts__user-name">
      {`Name: ${name}`}
    </span>
    <a href={`mailto:${email}`} className="posts__user-email">
      {email}
    </a>
    <p className="posts__user-address">
      <span>{`city: ${city}`}</span>
      <span>{`street: ${street}`}</span>
      <span>{`suite: ${suite}`}</span>
      <span>{`zip: ${zipcode}`}</span>
    </p>
  </div>
);
