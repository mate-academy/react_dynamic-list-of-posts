import React from 'react';
import PropTypes from 'prop-types';

import './User.css';

const User = ({ user }) => (
  <div className="post__author author">
    <address className="author__info">
      <span className="personal-info">
        <span>Name:</span>
        {user.name}
      </span>
      <span className="personal-info">
        <span>Address:</span>
        {user.address.city}
        ,
        {user.address.street}
      </span>
      <span className="personal-info">
        <span>Email:</span>
        {user.email}
      </span>
      <span className="personal-info">
        <span>Phone:</span>
        {user.phone}
      </span>
    </address>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default User;
