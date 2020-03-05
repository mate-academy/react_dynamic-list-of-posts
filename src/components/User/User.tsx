import React, { FC } from 'react';
import './User.css';

interface Props {
  user: UserInterface;
}

export const User: FC<Props> = ({ user }) => {
  const { name, email, address } = user;
  const { street, city, suite } = address;

  return (
    <span>
      {`User: ${name},
      Email: ${email},
      Address: city ${city}
      str.${street} ${suite}`}
    </span>
  );
};
