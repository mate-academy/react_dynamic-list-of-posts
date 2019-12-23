import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div className="user">
    <b>Post by:</b>
    <div className="user--name">{user.name}</div>
    <div className="user--email">{user.email}</div>
    <div className="user--address">
      {user.address.street}
      <br />
      {user.address.suite}
      <br />
      {user.address.city}
    </div>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default User;
