import React from 'react';
import PropTypes from 'prop-types';

function User({ user: { name, email, username } }) {
  return (
    <div className="users__info">
      <p>{name}</p>
      <p>{username}</p>
      <p>{email}</p>
    </div>
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
