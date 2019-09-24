import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

function User({ user }) {
  const { name, email } = user;
  const { street, suite, city } = user.address;

  return (
    <p className="list-group-item list-group-item-primary user-info">
      {
        `User: ${name}, email: ${email} |
        Adress: ${street}, ${suite}, ${city}`
      }
    </p>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      suite: PropTypes.string,
      city: PropTypes.string,
    }),
  }).isRequired,
};

export default User;
