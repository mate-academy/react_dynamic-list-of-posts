import React from 'react';
import PropTypes from 'prop-types';

function User({ user: { name, email, address } }) {
  return (
    <>
      <h4>{name}</h4>
      <a href="mailto:{email}">{email}</a>
      <p>
        <span>Street: {address.street}</span><br />
        <span>City: {address.city}</span><br />
        <span>Suite: {address.suite}</span><br />
      </p>
    </>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
    user: PropTypes.object,
  }).isRequired,
};

export default User;
