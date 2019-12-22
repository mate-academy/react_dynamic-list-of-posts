import React from 'react';
import PropTypes from 'prop-types';

const User = ({ userData: { name, email, address: { street } } }) => (
  <>
    <span>{`By ${name}`}</span>
    <span>{email}</span>
    <span>{street}</span>
  </>
);

User.propTypes
= { userData: PropTypes.oneOfType([PropTypes.object]).isRequired };

export default User;
