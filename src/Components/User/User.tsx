import React from 'react';

interface Props {
  user: UserType;
}

export const User: React.FC<Props> = ({ user }) => {
  const address = `${user.address.street}
  ${user.address.suite}
  ${user.address.city}
  ${user.address.zipcode}`;

  return (
    <div>
      <h2>
        {user.name}
      </h2>
      <p>
        {user.email}
      </p>
      <p>
        {address}
      </p>
    </div>
  );
};
