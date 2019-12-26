import React from 'react';
import PropTypes from 'prop-types';

export default function Comment({ name, email }) {
  return (
    <>
      <li>{name}</li>
      <li>{email}</li>
    </>
  );
}

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
