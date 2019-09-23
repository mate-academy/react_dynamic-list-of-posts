import React from 'react';
import { UserProps } from '../constants/PropTypes';
import './User.css';

const User = ({ name, email, address }) => (
  <div className="user">
    <p>
      <strong>Name:</strong>
      {name}
    </p>

    <p>
      <strong>Email:</strong>
      {email}
    </p>

    {address && (
      <p>
        <strong>Address: </strong>
        {`${address.city}, ${address.street}, ${address.suite}`}
      </p>
    )}
  </div>
);

User.propTypes = UserProps;

export default User;
