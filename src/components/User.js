import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name, username, email, address }) => (
  <div className="post-page__user">
    {name}
    {username && `(${username})`}
    <br />
    {email}
    <br />
    {address && `City: ${address.city}`}
    <br />
    {address && `Street: ${address.street}`}
  </div>
);

User.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string.isRequired,
  address: PropTypes.shape({
    city: PropTypes.string,
    street: PropTypes.string,
  }),
};

User.defaultProps = {
  name: null,
  username: null,
  address: null,
};

export default User;
