import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  const { name, email } = user;

  return (
    <div>
      <h3 className="user-name">{name}</h3>
      <p>{email}</p>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
