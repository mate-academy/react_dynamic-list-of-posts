import React from 'react';
import './User.css';
import { UserPropTypes } from '../../constants/prototypes';

const User = ({ name, email, address }) => (
  <div className="user">
    <a className="user-name" href="/ ">
      <img className="user-icon" src="./images/user-icon.png" alt="user-ipon" />
      {name}
    </a>
    <p className="user-email">
      {email}
    </p>
    {address && (
      <p className="user-address">
        {`${address.street}, ${address.suite},
        ${address.city}, ${address.zipcode}`}
      </p>
    )}
  </div>
);

User.propTypes = UserPropTypes;

export default User;
