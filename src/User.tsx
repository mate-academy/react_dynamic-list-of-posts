import React from 'react';
import { Users } from './helper';

type Props = {
  users: Users[];
};
const User: React.FC<Props> = ({ users }) => {
  return (
    <>
      {users.map(user => (
        <p>
          {user.name}
          {' '}
          {user.email}
          {' '}
          {user.address.street}
          {' '}
          {user.address.suite}
          {' '}
          {user.address.city}
          {' '}
          {user.address.zipcode}
        </p>
      ))}
    </>
  );
};

export default User;
