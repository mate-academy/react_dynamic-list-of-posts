import React from 'react';
import PropTypes from 'prop-types';
import './User.css';
import Address from '../Address/Address';

function User({ user }) {
  const {
    name, email, address,
  } = user;

  return (
    <div className="user">
      <h3>{name}</h3>
      <a href={`mailto:${email}`}>{email}</a>
      <Address address={address} />
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
