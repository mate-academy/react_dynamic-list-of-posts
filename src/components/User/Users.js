import React from 'react';
import './Users.css';
import PropTypes from 'prop-types';

export const Users = ({ name, email, website }) => (
  <>
    <h6>{name}</h6>
    <h6>{email}</h6>
    <h6>{website}</h6>
  </>
);

Users.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
