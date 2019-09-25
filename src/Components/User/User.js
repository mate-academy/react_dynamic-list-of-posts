import React from 'react';
import './User.css';
import { UserProps } from '../PropTypes/PropTypes';

const User = ({ name, email, address }) => (
  <div>
    <h2 className="user__name">{name}</h2>
    <p className="user__email">{email}</p>
    <p className="user__address">
      {`${address.street}, ${address.street}, ${address.city}`}
    </p>
  </div>
);

User.propTypes = UserProps;

export default User;
