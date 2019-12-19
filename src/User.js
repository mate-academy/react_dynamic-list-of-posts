import React from 'react';
import PropTypes from 'prop-types';

const User = ({ userObj: { name, email, address } }) => (
  <p>
    {`By ${name}`}
    <br />
    {email}
    <br />
    {`${address.street}, ${address.suite}, ${address.city}`}
  </p>
);

User.propTypes = {
  userObj: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      suite: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default User;
