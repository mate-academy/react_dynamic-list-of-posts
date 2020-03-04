import React, { FC } from 'react';

interface Props {
  user: User;
}


export const User: FC<Props> = (props) => {
  const {
    user: {
      name,
      email,
      address: {
        city,
        street,
        zipcode,
      },
    },
  } = props;

  return (
    <div className="user">
      <p>Autor contacts:</p>
      <p>{`name: ${name}, email: ${email}`}</p>
      <p>{`address: ${zipcode}, ${street}, ${city}`}</p>
    </div>
  );
};
