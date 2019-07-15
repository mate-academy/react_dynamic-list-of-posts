import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div className="User-head">
    <span>
      {user.name}
      /
    </span>
    <span>
      {user.email}
      /
    </span>
    <span>
      {user.address.city}
      /
    </span>
    <span>
      {user.address.street}
    </span>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.shape(
      {
        city: PropTypes.string,
        street: PropTypes.string,

      }
    ).isRequired,
  }).isRequired,
};

export default User;
