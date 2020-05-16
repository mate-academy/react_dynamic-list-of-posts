import React from 'react';

interface Props {
  person: User;
}

export const User: React.FC<Props> = ({ person }) => {
  const { username, email, address } = person;

  return (
    <div>
      <h3>{`author: ${username}`}</h3>
      <p>{`email: ${email}`}</p>
      <div className="address">
        <p>address:</p>
        <p>{address.street}</p>
        <p>{address.suite}</p>
        <p>{address.city}</p>
        <p>{address.zipcode}</p>
      </div>
    </div>
  );
};
