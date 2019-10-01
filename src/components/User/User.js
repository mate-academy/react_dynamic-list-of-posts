import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

function User({ user }) {
  const { name, email } = user;

  return (
    <div>
      <div>{name}</div>
      <div>{email}</div>
      <div>
        {`
          ${user.address.city},
          ${user.address.street},
          ${user.address.suite}
        `}
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
export default User;
