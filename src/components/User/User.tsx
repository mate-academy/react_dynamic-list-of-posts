import React, { FC } from 'react';

interface Props {
  user: UserType;
}

export const User: FC<Props> = ({ user }) => {
  const { name, email } = user;
  const { street, suite, city } = user.address;

  return (
    <ul className="user-list">
      <li className="user-item">
        <span className="user-title">Name:</span>
        {name}
      </li>
      <li className="user-item">
        <span className="user-title">Email:</span>
        {email}
      </li>
      <li className="user-item">
        <span className="user-title">Street:</span>
        {street}
      </li>
      <li className="user-item">
        <span className="user-title">Suite:</span>
        {suite}
      </li>
      <li className="user-item">
        <span className="user-title">City:</span>
        {city}
      </li>
    </ul>
  );
};
