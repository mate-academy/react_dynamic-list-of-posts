import React, { FC } from 'react';

interface Props {
  user: User;
}

export const User: FC<Props> = ({ user }) => {
  const { name, email, address } = user;
  const { city } = address;

  return (
    <ul className="user-info">
      <li className="user-info__part">{name}</li>
      <li className="user-info__part">
        <a href="`{email}`" className="email">{email}</a>
      </li>
      <li className="user-info__part">{city}</li>
    </ul>
  );
};
