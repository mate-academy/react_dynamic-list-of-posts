import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name, email, address }) => (
  <div className="user post__user">
    <h3 className="user__name">{`Author: ${name}`}</h3>
    <p className="user__email">{`email: ${email}`}</p>
    <p className="user__city">{`city: ${address.city}`}</p>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.shape({
    city: PropTypes.string,
  }).isRequired,
};

export default User;
