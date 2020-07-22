import React, { FC } from 'react';

interface Props {
  user: User;
}

export const User: FC<Props> = ({ user }) => {
  const { name, email } = user;
  const { street, suite, city } = user.address;

  return (
    <ul className="list-group">
      <li className="list-group-item">{name}</li>
      <li className="list-group-item">{email}</li>
      <li className="list-group-item">{street}</li>
      <li className="list-group-item">{suite}</li>
      <li className="list-group-item">{city}</li>
    </ul>
  );
};
