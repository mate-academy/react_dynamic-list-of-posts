import React from 'react';
import PropTypes from 'prop-types';

export default function User(props) {
  return (
    <>
      <td>
        {props.user.name}
      </td>
      <td>
        {props.user.email}
      </td>
      <td>
        {props.user.address.street}
      </td>
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
