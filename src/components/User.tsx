import React from 'react';
import { Users } from '../api/api';

type Props = {
  user: Users;
}

const User: React.FC<Props> = ({ user }) => (
  <div className="posts__user user">
    <div className="user__name">
      <p>
        {user.name}
      </p>
      <p>
        {user.email}
      </p>
    </div>
    <div className="user__adress">
      <p>
        Street: &nbsp;
        {user.address.street}
      </p>
      <p>
        Suite: &nbsp;
        {user.address.suite}
      </p>
      <p>
        City: &nbsp;
        {user.address.city}
      </p>
      <p>
        Zipcode: &nbsp;
        {user.address.zipcode}
      </p>
    </div>
  </div>
);

export default User;
