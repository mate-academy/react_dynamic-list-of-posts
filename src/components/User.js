import React from 'react';
import PropTypes from 'prop-types';

export default function User({ user }) {
  return (
    <>
      <li>
        {user.name}
      </li>
      <li>
        {user.email}
      </li>
      <li>
        {user.address.street}
      </li>
    </>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
