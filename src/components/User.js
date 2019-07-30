import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <>
      <h1>{user.name}</h1>
      <h3>{user.username}</h3>
    </>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
