import React from 'react';
import PropTypes from 'prop-types';

export default function User(props) {
  return (
    <>
      <li>
        {props.user.name}
      </li>
      <li>
        {props.user.email}
      </li>
      <li>
        {props.user.address.street}
      </li>
    </>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
