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
    <div>
      <p>
        <b>Info Author: </b>
        {`${name} `}
        <a href={`mailto:${email}`}>{email}</a>
      </p>
      <address>
        <b>Address: </b>
        {`${zipcode}, ${street}, ${city}`}
      </address>
    </div>
  );
};
