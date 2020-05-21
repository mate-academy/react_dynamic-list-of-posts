import React from 'react';
import { Users } from '../api';

type Props = {
  user: Users;
};

const User: React.FC<Props> = ({ user }) => (
  <div className="post__user user">
    <div className="user__contacts">
      <p>
        Name:
        {' '}
        {user.name}
      </p>
      <p>
        Email:
        {' '}
        {user.email}
      </p>
    </div>

    <div className="user__address">
      <p>
        Street:
        {' '}
        {user.address.street}
      </p>
      <p>
        Suite:
        {' '}
        {user.address.suite}
      </p>
      <p>
        City:
        {' '}
        {user.address.city}
      </p>
      <p>
        Zipcode:
        {' '}
        {user.address.zipcode}
      </p>
    </div>
  </div>
);

export default User;
