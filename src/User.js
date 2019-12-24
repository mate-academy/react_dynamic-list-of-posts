import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div className="author">
    <p className="username">
      <b>Name:</b>
      {' '}
      {user.name}
    </p>
    <address className="city">
      <b>address:</b>
      {' '}
      {user.address.city}
    </address>
    <p><b>email:</b></p>
    <a href="{user.email}" className="link">
      {user.email}
    </a>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    address: PropTypes.object,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default User;
