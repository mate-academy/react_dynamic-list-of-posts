import React, { FC } from 'react';

interface Props {
  user: User;
}

export const User: FC<Props> = ({ user }) => {
  const { name, email, address } = user;

  return (
    <>
      <h3>{`Posted by: ${name}`}</h3>
      <p>
        {`Email: ${email}.
         Address: ${address.city} 
         ${address.street} ${address.suite}`}
      </p>
    </>
  );
};
