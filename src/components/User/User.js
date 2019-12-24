import React from 'react';
import PropTypes from 'prop-types';

function User({ currentUser }) {
  const { name, email, address } = currentUser;

  return (
    <>
      <p>{name}</p>
      <p>
@:
        {email}
      </p>
      <p>
city:
        {address.city}
      </p>
    </>
  );
}

export default User;

User.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    city: PropTypes.string,
  }).isRequired,
};
