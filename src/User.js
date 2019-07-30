import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div className="Users">
    <span>
      {"Name: " + user.name + ", " +
      "E-mail: " + user.email + ", " +
      "Address: " + user.address.city + ", " + user.address.street}
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
