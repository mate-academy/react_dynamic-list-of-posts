import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name, email, address }) => (
  <div className="author">
    <h4>{`Name: ${name}`}</h4>
    <p>{`Email: ${email}`}</p>
    <p>{`City: ${address.city}`}</p>
  </div>
);

User.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.shape({
    city: PropTypes.string,
  }),
}.isRequired;

export default User;
